import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { geocodeSearch } from "@/lib/clients/geocode-search";
import { reverseGeocode } from "@/lib/clients/reverse-geocode";
import ClientGeolocationStep from "./ClientGeolocationStep";

vi.mock("@/hooks/use-debounce", () => ({
  useDebounce: <T,>(value: T) => value,
}));

vi.mock("@/lib/clients/geocode-search", () => ({
  geocodeSearch: vi.fn(),
}));

vi.mock("@/lib/clients/reverse-geocode", () => ({
  reverseGeocode: vi.fn(),
}));

vi.mock("./ClientLocationMapPicker", () => ({
  default: ({
    value,
  }: {
    value: { latitude: number; longitude: number } | null;
  }) => (
    <div data-testid="map-picker">
      {value
        ? `${value.latitude.toFixed(6)},${value.longitude.toFixed(6)}`
        : "no-coordinates"}
    </div>
  ),
}));

describe("ClientGeolocationStep", () => {
  const geocodeSearchMock = vi.mocked(geocodeSearch);
  const reverseGeocodeMock = vi.mocked(reverseGeocode);

  beforeEach(() => {
    geocodeSearchMock.mockReset();
    reverseGeocodeMock.mockReset();
    geocodeSearchMock.mockResolvedValue({
      results: [
        {
          label:
            "Avenida Abraham Lincoln, Piantini, Santo Domingo, Distrito Nacional, Republica Dominicana",
          latitude: 18.4707346,
          longitude: -69.9399364,
        },
      ],
    });
    reverseGeocodeMock.mockResolvedValue({
      address:
        "Avenida Abraham Lincoln, Piantini, Santo Domingo, Distrito Nacional, Republica Dominicana",
    });
  });

  it("updates address and coordinates when the user selects a search result", async () => {
    render(
      <ClientGeolocationStep
        onSubmit={vi.fn()}
        onBack={vi.fn()}
        isSubmitting={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("Search on map"), {
      target: {
        value: "Abraham Lincoln",
      },
    });

    const resultButton = await screen.findByRole("button", {
      name: /avenida abraham lincoln/i,
    });

    fireEvent.click(resultButton);

    await waitFor(() => {
      expect(screen.getByLabelText("Address")).toHaveValue(
        "Avenida Abraham Lincoln, Piantini, Santo Domingo, Distrito Nacional, Republica Dominicana",
      );
    });

    expect(screen.getByText("18.470735")).toBeInTheDocument();
    expect(screen.getByText("-69.939936")).toBeInTheDocument();
    expect(screen.getByTestId("map-picker")).toHaveTextContent(
      "18.470735,-69.939936",
    );
  });
});
