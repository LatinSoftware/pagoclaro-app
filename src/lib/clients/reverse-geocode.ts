import { reverseGeocodeAction } from "@/actions/clients";

export interface ReverseGeocodeCoordinates {
  latitude: number;
  longitude: number;
}

export interface ReverseGeocodeResponse {
  address: string | null;
}

export async function reverseGeocode(
  coordinates: ReverseGeocodeCoordinates,
): Promise<ReverseGeocodeResponse> {
  const response = await reverseGeocodeAction(
    coordinates.latitude,
    coordinates.longitude,
  );

  if (!response.success) {
    throw new Error(
      response.error || "We couldn't resolve the address right now.",
    );
  }

  return {
    address: response.address ?? null,
  };
}
