"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  reverseGeocode,
  ReverseGeocodeCoordinates,
} from "@/lib/clients/reverse-geocode";
import { useDebounce } from "@/hooks/use-debounce";

type LookupStatus = "idle" | "loading" | "success" | "error";

interface UseReverseGeocodeAddressOptions {
  initialCoordinates?: ReverseGeocodeCoordinates | null;
  debounceMs?: number;
  onResolvedAddress: (address: string) => void;
}

export function useReverseGeocodeAddress({
  initialCoordinates = null,
  debounceMs = 500,
  onResolvedAddress,
}: UseReverseGeocodeAddressOptions) {
  const [selectedCoordinates, setSelectedCoordinatesState] =
    useState<ReverseGeocodeCoordinates | null>(initialCoordinates);
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>("idle");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lastResolvedAddress, setLastResolvedAddress] = useState<string | null>(
    null,
  );
  const latestRequestIdRef = useRef(0);
  const manualEditVersionRef = useRef(0);
  const applyResolvedAddress = useEffectEvent(onResolvedAddress);
  const debouncedCoordinates = useDebounce(selectedCoordinates, debounceMs);

  useEffect(() => {
    if (!debouncedCoordinates) {
      setLookupStatus("idle");
      setLookupError(null);
      setLastResolvedAddress(null);
      return;
    }

    const requestId = latestRequestIdRef.current + 1;
    const manualEditVersionAtRequestStart = manualEditVersionRef.current;
    latestRequestIdRef.current = requestId;
    setLookupStatus("loading");
    setLookupError(null);

    let isCancelled = false;

    void reverseGeocode(debouncedCoordinates)
      .then((response) => {
        if (isCancelled || latestRequestIdRef.current !== requestId) {
          return;
        }

        if (!response.address) {
          setLookupStatus("error");
          setLookupError(
            "We couldn't find a readable address. You can type it manually.",
          );
          setLastResolvedAddress(null);
          return;
        }

        setLookupStatus("success");
        setLookupError(null);
        setLastResolvedAddress(response.address);

        if (manualEditVersionRef.current === manualEditVersionAtRequestStart) {
          applyResolvedAddress(response.address);
        }
      })
      .catch(() => {
        if (isCancelled || latestRequestIdRef.current !== requestId) {
          return;
        }

        setLookupStatus("error");
        setLookupError(
          "We couldn't resolve the address right now. You can type it manually.",
        );
        setLastResolvedAddress(null);
      });

    return () => {
      isCancelled = true;
    };
  }, [debouncedCoordinates]);

  const setSelectedCoordinates = (
    coordinates: ReverseGeocodeCoordinates | null,
  ) => {
    setSelectedCoordinatesState(coordinates);
    setLookupError(null);
  };

  const markAddressEdited = () => {
    manualEditVersionRef.current += 1;
  };

  return {
    selectedCoordinates,
    setSelectedCoordinates,
    markAddressEdited,
    lookupStatus,
    lookupError,
    lastResolvedAddress,
    isResolvingAddress: lookupStatus === "loading",
  };
}
