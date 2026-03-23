"use client";

import { useEffect, useRef, useState } from "react";
import {
  geocodeSearch,
  GeocodeSearchResult,
} from "@/lib/clients/geocode-search";
import { useDebounce } from "@/hooks/use-debounce";

type SearchStatus = "idle" | "loading" | "success" | "error";

interface UseGeocodeSearchOptions {
  debounceMs?: number;
  limit?: number;
  minQueryLength?: number;
}

export function useGeocodeSearch({
  debounceMs = 350,
  limit = 5,
  minQueryLength = 3,
}: UseGeocodeSearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeSearchResult[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const latestRequestIdRef = useRef(0);
  const suppressedQueryRef = useRef<string | null>(null);
  const debouncedQuery = useDebounce(query.trim(), debounceMs);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < minQueryLength) {
      setResults([]);
      setStatus("idle");
      setError(null);
      return;
    }

    if (suppressedQueryRef.current === debouncedQuery) {
      suppressedQueryRef.current = null;
      setResults([]);
      setStatus("idle");
      setError(null);
      return;
    }

    const requestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = requestId;
    setStatus("loading");
    setError(null);

    let isCancelled = false;

    void geocodeSearch(debouncedQuery, limit)
      .then((response) => {
        if (isCancelled || latestRequestIdRef.current !== requestId) {
          return;
        }

        setResults(response.results);
        setStatus("success");
      })
      .catch(() => {
        if (isCancelled || latestRequestIdRef.current !== requestId) {
          return;
        }

        setResults([]);
        setStatus("error");
        setError("We couldn't search that address right now.");
      });

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery, limit, minQueryLength]);

  const applySelectedLabel = (label: string) => {
    suppressedQueryRef.current = label.trim();
    setQuery(label);
    setResults([]);
    setStatus("idle");
    setError(null);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setStatus("idle");
    setError(null);
  };

  return {
    query,
    setQuery,
    results,
    status,
    error,
    isLoading: status === "loading",
    hasResults: results.length > 0,
    applySelectedLabel,
    clearSearch,
    minQueryLength,
  };
}
