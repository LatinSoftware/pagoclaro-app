import { geocodeSearchAction } from "@/actions/clients";

export interface GeocodeSearchResult {
  label: string;
  latitude: number;
  longitude: number;
}

export interface GeocodeSearchResponse {
  results: GeocodeSearchResult[];
}

export async function geocodeSearch(
  query: string,
  limit = 5,
): Promise<GeocodeSearchResponse> {
  const response = await geocodeSearchAction(query, limit);

  if (!response.success) {
    throw new Error(response.error || "We couldn't search that address right now.");
  }

  return {
    results: response.results ?? [],
  };
}
