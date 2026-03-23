"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Loader2, MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReverseGeocodeCoordinates } from "@/lib/clients/reverse-geocode";

const DEFAULT_CENTER: ReverseGeocodeCoordinates = {
  latitude: 18.4861,
  longitude: -69.9312,
};
const DEFAULT_ZOOM = 12;
const SELECTED_ZOOM = 16;

type LeafletModule = typeof import("leaflet");
type LeafletMap = import("leaflet").Map;
type LeafletMarker = import("leaflet").Marker;

interface ClientLocationMapPickerProps {
  value: ReverseGeocodeCoordinates | null;
  onChange: (coordinates: ReverseGeocodeCoordinates) => void;
  className?: string;
}

function createMarkerIcon(leaflet: LeafletModule) {
  return leaflet.divIcon({
    className: "pc-map-marker",
    html: '<span class="pc-map-marker__pin"></span>',
    iconSize: [26, 38],
    iconAnchor: [13, 38],
  });
}

export default function ClientLocationMapPicker({
  value,
  onChange,
  className,
}: ClientLocationMapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const [isReady, setIsReady] = useState(false);
  const emitChange = useEffectEvent(onChange);

  useEffect(() => {
    let isMounted = true;

    async function initializeMap() {
      if (!mapContainerRef.current || mapRef.current) {
        return;
      }

      const leaflet = await import("leaflet");

      if (!isMounted || !mapContainerRef.current) {
        return;
      }

      leafletRef.current = leaflet;

      const map = leaflet.map(mapContainerRef.current, {
        zoomControl: true,
      });

      mapRef.current = map;

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        })
        .addTo(map);

      map.on("click", (event) => {
        emitChange({
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
        });
      });

      map.setView(
        value
          ? [value.latitude, value.longitude]
          : [DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude],
        value ? SELECTED_ZOOM : DEFAULT_ZOOM,
      );

      if (value) {
        markerRef.current = leaflet
          .marker([value.latitude, value.longitude], {
            draggable: true,
            icon: createMarkerIcon(leaflet),
          })
          .addTo(map);

        markerRef.current.on("dragend", (event) => {
          const target = event.target as LeafletMarker;
          const position = target.getLatLng();

          emitChange({
            latitude: position.lat,
            longitude: position.lng,
          });
        });
      }

      requestAnimationFrame(() => {
        map.invalidateSize();
        setIsReady(true);
      });
    }

    void initializeMap();

    return () => {
      isMounted = false;
      markerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  useEffect(() => {
    const leaflet = leafletRef.current;
    const map = mapRef.current;

    if (!leaflet || !map) {
      return;
    }

    if (!value) {
      markerRef.current?.remove();
      markerRef.current = null;
      map.setView(
        [DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude],
        DEFAULT_ZOOM,
      );
      return;
    }

    if (!markerRef.current) {
      markerRef.current = leaflet
        .marker([value.latitude, value.longitude], {
          draggable: true,
          icon: createMarkerIcon(leaflet),
        })
        .addTo(map);

      markerRef.current.on("dragend", (event) => {
        const target = event.target as LeafletMarker;
        const position = target.getLatLng();

        emitChange({
          latitude: position.lat,
          longitude: position.lng,
        });
      });
    } else {
      markerRef.current.setLatLng([value.latitude, value.longitude]);
    }

    map.setView(
      [value.latitude, value.longitude],
      Math.max(map.getZoom(), SELECTED_ZOOM),
      {
        animate: true,
      },
    );
  }, [value]);

  return (
    <div
      className={cn(
        "pc-location-map relative overflow-hidden rounded-2xl border bg-muted/30",
        className,
      )}
    >
      {!isReady && (
        <div className="absolute inset-0 z-[500] flex items-center justify-center gap-3 bg-background/90 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading map...
        </div>
      )}

      <div
        ref={mapContainerRef}
        className="h-[360px] w-full"
        aria-label="Location map picker"
      />

      <div className="pointer-events-none absolute left-4 top-4 z-[450] rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
        <span className="inline-flex items-center gap-2">
          <MapPinned className="h-3.5 w-3.5 text-primary" />
          Click to place the pin. Drag to adjust.
        </span>
      </div>
    </div>
  );
}
