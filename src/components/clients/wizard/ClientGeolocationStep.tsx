"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LocateFixed,
  Loader2,
  MapPin,
  Navigation,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ClientGeolocation,
  clientGeolocationSchema,
} from "@/lib/schemas/client-wizard";
import { GeocodeSearchResult } from "@/lib/clients/geocode-search";
import { ReverseGeocodeCoordinates } from "@/lib/clients/reverse-geocode";
import { useGeocodeSearch } from "@/hooks/use-geocode-search";
import { useReverseGeocodeAddress } from "@/hooks/use-reverse-geocode-address";
import ClientLocationMapPicker from "./ClientLocationMapPicker";

interface ClientGeolocationStepProps {
  defaultValues?: Partial<ClientGeolocation>;
  onSubmit: (data: ClientGeolocation) => void;
  onBack: (data?: Partial<ClientGeolocation>) => void;
  isSubmitting: boolean;
}

function getInitialCoordinates(
  defaultValues?: Partial<ClientGeolocation>,
): ReverseGeocodeCoordinates | null {
  if (
    defaultValues?.latitude === null ||
    defaultValues?.latitude === undefined ||
    defaultValues?.longitude === null ||
    defaultValues?.longitude === undefined
  ) {
    return null;
  }

  return {
    latitude: defaultValues.latitude,
    longitude: defaultValues.longitude,
  };
}

export default function ClientGeolocationStep({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting,
}: ClientGeolocationStepProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const initialCoordinates = getInitialCoordinates(defaultValues);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ClientGeolocation>({
    resolver: zodResolver(clientGeolocationSchema),
    defaultValues: {
      latitude: defaultValues?.latitude ?? null,
      longitude: defaultValues?.longitude ?? null,
      address: defaultValues?.address ?? "",
    },
  });

  const addressField = register("address");
  const latitudeField = register("latitude", {
    setValueAs: (value) => (value === "" ? null : Number(value)),
  });
  const longitudeField = register("longitude", {
    setValueAs: (value) => (value === "" ? null : Number(value)),
  });
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const address = watch("address");
  const applyResolvedAddress = (nextAddress: string) => {
    setValue("address", nextAddress, {
      shouldValidate: true,
    });
  };
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    results: searchResults,
    status: searchStatus,
    error: searchError,
    isLoading: isSearchingAddress,
    hasResults,
    applySelectedLabel,
    clearSearch,
    minQueryLength,
  } = useGeocodeSearch();
  const {
    selectedCoordinates,
    setSelectedCoordinates,
    markAddressEdited,
    lookupStatus,
    lookupError,
    lastResolvedAddress,
    isResolvingAddress,
  } = useReverseGeocodeAddress({
    initialCoordinates,
    onResolvedAddress: applyResolvedAddress,
  });

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchResultsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!selectedCoordinates) {
      setValue("latitude", null, { shouldValidate: true });
      setValue("longitude", null, { shouldValidate: true });
      return;
    }

    setValue("latitude", selectedCoordinates.latitude, { shouldValidate: true });
    setValue("longitude", selectedCoordinates.longitude, {
      shouldValidate: true,
    });
  }, [selectedCoordinates, setValue]);

  const captureLocation = () => {
    setIsCapturing(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsCapturing(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsCapturing(false);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";

        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location permission denied";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "The request to get your location timed out";
        }

        setLocationError(errorMessage);
        setIsCapturing(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    addressField.onChange(event);
    markAddressEdited();
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsSearchResultsOpen(true);
  };

  const handleSelectSearchResult = (result: GeocodeSearchResult) => {
    applySelectedLabel(result.label);
    setSelectedCoordinates({
      latitude: result.latitude,
      longitude: result.longitude,
    });
    setValue("address", result.label, {
      shouldValidate: true,
    });
    setLocationError(null);
    setIsSearchResultsOpen(false);
  };

  const showSearchDropdown =
    isSearchResultsOpen &&
    searchQuery.trim().length >= minQueryLength &&
    (isSearchingAddress ||
      hasResults ||
      searchStatus === "success" ||
      searchError !== null);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4 rounded-2xl border bg-muted/20 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5 text-primary" />
              Select the exact location
            </h3>
            <p className="text-sm text-muted-foreground">
              Search your address or pick the point manually on the map. We
              will use that point to fill the coordinates and suggest the
              address.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={captureLocation}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Locating...
              </>
            ) : (
              <>
                <LocateFixed className="mr-2 h-4 w-4" />
                Use Current Location
              </>
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="map-search">Search on map</Label>
          <div className="relative" ref={searchContainerRef}>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="map-search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              onFocus={() => {
                if (searchQuery.trim().length >= minQueryLength) {
                  setIsSearchResultsOpen(true);
                }
              }}
              placeholder="Search street, sector or city"
              className="pl-9 pr-10"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() => {
                  clearSearch();
                  setIsSearchResultsOpen(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {showSearchDropdown && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[460] overflow-hidden rounded-xl border bg-background shadow-lg">
                {isSearchingAddress && (
                  <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching addresses...
                  </div>
                )}

                {!isSearchingAddress && searchError && (
                  <div className="px-4 py-3 text-sm text-amber-600">
                    {searchError}
                  </div>
                )}

                {!isSearchingAddress &&
                  !searchError &&
                  searchResults.map((result) => (
                    <button
                      key={`${result.latitude}-${result.longitude}-${result.label}`}
                      type="button"
                      className="flex w-full items-start gap-3 border-b px-4 py-3 text-left text-sm transition-colors last:border-b-0 hover:bg-muted/60"
                      onClick={() => handleSelectSearchResult(result)}
                    >
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{result.label}</span>
                    </button>
                  ))}

                {!isSearchingAddress &&
                  !searchError &&
                  searchStatus === "success" &&
                  !hasResults && (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No results found for that address.
                    </div>
                  )}
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Type at least {minQueryLength} characters to search in Dominican
            Republic locations.
          </p>
        </div>

        <ClientLocationMapPicker
          value={selectedCoordinates}
          onChange={setSelectedCoordinates}
        />

        <div className="grid gap-3 rounded-xl border bg-background/80 p-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Latitude
            </p>
            <p className="text-sm font-medium">
              {latitude !== null ? latitude.toFixed(6) : "Not selected yet"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Longitude
            </p>
            <p className="text-sm font-medium">
              {longitude !== null ? longitude.toFixed(6) : "Not selected yet"}
            </p>
          </div>
        </div>

        {(errors.latitude || errors.longitude) && (
          <p className="text-sm text-red-500">
            {errors.latitude?.message || errors.longitude?.message}
          </p>
        )}

        {locationError && (
          <p className="text-sm text-red-500">{locationError}</p>
        )}

        <input
          type="hidden"
          readOnly
          value={latitude ?? ""}
          {...latitudeField}
        />
        <input
          type="hidden"
          readOnly
          value={longitude ?? ""}
          {...longitudeField}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...addressField}
          value={address ?? ""}
          onChange={handleAddressChange}
          placeholder="Enter street, sector and city"
          className={errors.address ? "border-red-500" : ""}
        />

        {isResolvingAddress && (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Searching address...
          </p>
        )}

        {lookupStatus === "success" && lastResolvedAddress && (
          <p className="flex items-center gap-2 text-xs text-emerald-600">
            <Navigation className="h-3.5 w-3.5" />
            We found a readable address for this point.
          </p>
        )}

        {lookupError && (
          <p className="text-xs text-amber-600">{lookupError}</p>
        )}

        <p className="text-xs text-muted-foreground">
          You can always edit the address manually, even if reverse geocoding
          fails.
        </p>

        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => onBack(getValues())}>
          Back
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Client"
          )}
        </Button>
      </div>
    </form>
  );
}
