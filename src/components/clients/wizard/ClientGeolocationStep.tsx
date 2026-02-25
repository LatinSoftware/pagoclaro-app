"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ClientGeolocation, clientGeolocationSchema } from "@/lib/schemas/client-wizard";
import { MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

interface ClientGeolocationStepProps {
  defaultValues?: Partial<ClientGeolocation>;
  basicInfoAddress?: string;
  onSubmit: (data: ClientGeolocation) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function ClientGeolocationStep({ 
  defaultValues, 
  basicInfoAddress, 
  onSubmit, 
  onBack,
  isSubmitting
}: ClientGeolocationStepProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientGeolocation>({
    resolver: zodResolver(clientGeolocationSchema),
    defaultValues: {
      latitude: defaultValues?.latitude || null,
      longitude: defaultValues?.longitude || null,
      address: defaultValues?.address || basicInfoAddress || "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  // const address = watch("address");

  // Update address if basicInfoAddress changes and we haven't modified it yet?
  // For now, we initialized it in defaultValues.

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
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
        setIsCapturing(false);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location permission denied";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "The request to get user location timed out";
        }
        setLocationError(errorMessage);
        setIsCapturing(false);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="bg-muted/30 p-6 rounded-lg border flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">Geolocation Capture</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              We need to capture your current location to verify the client&apos;s address.
            </p>
          </div>

          {latitude && longitude ? (
            <div className="flex flex-col items-center space-y-2 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center text-green-600 font-medium">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Location Captured
              </div>
              <div className="text-xs text-muted-foreground bg-background border px-3 py-1 rounded-md">
                Lat: {latitude.toFixed(6)}, Long: {longitude.toFixed(6)}
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={captureLocation}
                disabled={isCapturing}
                className="mt-2"
              >
                {isCapturing ? <Loader2 className="h-3 w-3 animate-spin" /> : "Retake Location"}
              </Button>
            </div>
          ) : (
            <Button 
              type="button" 
              onClick={captureLocation} 
              disabled={isCapturing}
              className="min-w-[150px]"
            >
              {isCapturing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Capturing...
                </>
              ) : (
                "Capture Location"
              )}
            </Button>
          )}

          {locationError && (
            <p className="text-sm text-red-500 font-medium">{locationError}</p>
          )}
          
          <input type="hidden" {...register("latitude", { valueAsNumber: true })} />
          <input type="hidden" {...register("longitude", { valueAsNumber: true })} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Confirm Address</Label>
        <Input
          id="address"
          {...register("address")}
          placeholder="Enter street, city, state and zip"
          className={errors.address ? "border-red-500" : ""}
        />
        <p className="text-xs text-muted-foreground">
          You can overwrite the address if the captured location differs from the residential address.
        </p>
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : "Create Client"}
        </Button>
      </div>
    </form>
  );
}
