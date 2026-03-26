import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { reverseGeocode } from "@/lib/clients/reverse-geocode";
import { useReverseGeocodeAddress } from "./use-reverse-geocode-address";

vi.mock("@/lib/clients/reverse-geocode", () => ({
  reverseGeocode: vi.fn(),
}));

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolver) => {
    resolve = resolver;
  });

  return { promise, resolve };
}

describe("useReverseGeocodeAddress", () => {
  const reverseGeocodeMock = vi.mocked(reverseGeocode);
  const renderReverseGeocodeHook = (onResolvedAddress = vi.fn()) =>
    renderHook(
      () =>
        useReverseGeocodeAddress({
          onResolvedAddress,
          debounceMs: 10,
        }),
      {
        reactStrictMode: false,
      },
    );

  beforeEach(() => {
    reverseGeocodeMock.mockReset();
  });

  it("debounces rapid coordinate changes and only calls the latest lookup", async () => {
    const onResolvedAddress = vi.fn();
    reverseGeocodeMock.mockResolvedValue({ address: "Final address" });

    const { result } = renderReverseGeocodeHook(onResolvedAddress);

    act(() => {
      result.current.setSelectedCoordinates({
        latitude: 18.48,
        longitude: -69.93,
      });
      result.current.setSelectedCoordinates({
        latitude: 18.49,
        longitude: -69.94,
      });
      result.current.setSelectedCoordinates({
        latitude: 18.5,
        longitude: -69.95,
      });
    });

    expect(reverseGeocodeMock).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(reverseGeocodeMock).toHaveBeenCalledTimes(1);
    });

    expect(reverseGeocodeMock).toHaveBeenCalledWith({
      latitude: 18.5,
      longitude: -69.95,
    });
    expect(onResolvedAddress).toHaveBeenCalledWith("Final address");
  });

  it("moves from idle to loading to success", async () => {
    const onResolvedAddress = vi.fn();
    const lookup = createDeferred<{ address: string | null }>();

    reverseGeocodeMock.mockImplementation(() => lookup.promise);

    const { result } = renderReverseGeocodeHook(onResolvedAddress);

    expect(result.current.lookupStatus).toBe("idle");

    act(() => {
      result.current.setSelectedCoordinates({
        latitude: 18.4861,
        longitude: -69.9312,
      });
    });

    await waitFor(() => {
      expect(result.current.lookupStatus).toBe("loading");
    });

    expect(result.current.isResolvingAddress).toBe(true);

    await act(async () => {
      lookup.resolve({
        address: "Av. Abraham Lincoln, Piantini, Santo Domingo",
      });
      await lookup.promise;
    });

    await waitFor(() => {
      expect(result.current.lookupStatus).toBe("success");
    });

    expect(result.current.lastResolvedAddress).toBe(
      "Av. Abraham Lincoln, Piantini, Santo Domingo",
    );
    expect(onResolvedAddress).toHaveBeenCalledWith(
      "Av. Abraham Lincoln, Piantini, Santo Domingo",
    );
  });

  it("ignores stale responses and keeps the latest lookup result", async () => {
    const onResolvedAddress = vi.fn();
    const firstLookup = createDeferred<{ address: string | null }>();
    const secondLookup = createDeferred<{ address: string | null }>();

    reverseGeocodeMock.mockImplementation((coordinates) => {
      if (coordinates.latitude === 18.48) {
        return firstLookup.promise;
      }

      return secondLookup.promise;
    });

    const { result } = renderReverseGeocodeHook(onResolvedAddress);

    act(() => {
      result.current.setSelectedCoordinates({
        latitude: 18.48,
        longitude: -69.93,
      });
    });

    await waitFor(() => {
      expect(reverseGeocodeMock).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.setSelectedCoordinates({
        latitude: 18.5,
        longitude: -69.95,
      });
    });

    await waitFor(() => {
      expect(reverseGeocodeMock).toHaveBeenCalledTimes(2);
    });

    await act(async () => {
      firstLookup.resolve({ address: "Old address" });
      await firstLookup.promise;
    });

    expect(onResolvedAddress).not.toHaveBeenCalledWith("Old address");

    await act(async () => {
      secondLookup.resolve({ address: "Latest address" });
      await secondLookup.promise;
    });

    await waitFor(() => {
      expect(onResolvedAddress).toHaveBeenCalledWith("Latest address");
    });

    expect(result.current.lastResolvedAddress).toBe("Latest address");
  });

  it("does not overwrite a manual edit made after the lookup started", async () => {
    const onResolvedAddress = vi.fn();
    const lookup = createDeferred<{ address: string | null }>();

    reverseGeocodeMock.mockImplementation(() => lookup.promise);

    const { result } = renderReverseGeocodeHook(onResolvedAddress);

    act(() => {
      result.current.setSelectedCoordinates({
        latitude: 18.4861,
        longitude: -69.9312,
      });
    });

    await waitFor(() => {
      expect(result.current.lookupStatus).toBe("loading");
    });

    act(() => {
      result.current.markAddressEdited();
    });

    await act(async () => {
      lookup.resolve({ address: "Autofilled address" });
      await lookup.promise;
    });

    await waitFor(() => {
      expect(result.current.lookupStatus).toBe("success");
    });

    expect(result.current.lastResolvedAddress).toBe("Autofilled address");
    expect(onResolvedAddress).not.toHaveBeenCalled();
  });
});
