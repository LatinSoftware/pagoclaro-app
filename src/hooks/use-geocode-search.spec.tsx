import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { geocodeSearch } from "@/lib/clients/geocode-search";
import { useGeocodeSearch } from "./use-geocode-search";

vi.mock("@/lib/clients/geocode-search", () => ({
  geocodeSearch: vi.fn(),
}));

describe("useGeocodeSearch", () => {
  const geocodeSearchMock = vi.mocked(geocodeSearch);
  const renderGeocodeSearchHook = () =>
    renderHook(() => useGeocodeSearch({ debounceMs: 10 }), {
      reactStrictMode: false,
    });

  beforeEach(() => {
    geocodeSearchMock.mockReset();
  });

  it("does not search before the minimum query length", async () => {
    const { result } = renderGeocodeSearchHook();

    act(() => {
      result.current.setQuery("ab");
    });

    await new Promise((resolve) => setTimeout(resolve, 25));

    expect(geocodeSearchMock).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
    expect(result.current.results).toEqual([]);
  });

  it("debounces text input and returns the latest results", async () => {
    geocodeSearchMock.mockResolvedValue({
      results: [
        {
          label: "Avenida Abraham Lincoln, Santo Domingo",
          latitude: 18.4707346,
          longitude: -69.9399364,
        },
      ],
    });

    const { result } = renderGeocodeSearchHook();

    act(() => {
      result.current.setQuery("Abra");
      result.current.setQuery("Abraham");
      result.current.setQuery("Abraham Lincoln");
    });

    await waitFor(() => {
      expect(geocodeSearchMock).toHaveBeenCalledTimes(1);
    });

    expect(geocodeSearchMock).toHaveBeenCalledWith("Abraham Lincoln", 5);
    expect(result.current.results).toEqual([
      {
        label: "Avenida Abraham Lincoln, Santo Domingo",
        latitude: 18.4707346,
        longitude: -69.9399364,
      },
    ]);
    expect(result.current.status).toBe("success");
  });

  it("suppresses an immediate re-search after selecting a result label", async () => {
    geocodeSearchMock.mockResolvedValue({
      results: [
        {
          label: "Avenida Abraham Lincoln, Santo Domingo",
          latitude: 18.4707346,
          longitude: -69.9399364,
        },
      ],
    });

    const { result } = renderGeocodeSearchHook();

    act(() => {
      result.current.setQuery("Abraham Lincoln");
    });

    await waitFor(() => {
      expect(geocodeSearchMock).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.applySelectedLabel(
        "Avenida Abraham Lincoln, Santo Domingo",
      );
    });

    await new Promise((resolve) => setTimeout(resolve, 25));

    expect(geocodeSearchMock).toHaveBeenCalledTimes(1);
    expect(result.current.query).toBe(
      "Avenida Abraham Lincoln, Santo Domingo",
    );
    expect(result.current.results).toEqual([]);
    expect(result.current.status).toBe("idle");
  });
});
