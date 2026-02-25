import { z } from "zod";

export const clientBasicInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  cedula: z
    .string()
    .min(6, "Cedula must be at least 6 characters")
    .max(12, "Cedula must be at most 12 characters"), // Adjust validation based on real format
  phone: z.string().length(10, "Phone number must be 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export const clientDocumentSchema = z.object({
  frontId: z
    .any()
    .refine((file) => file instanceof File, "Front ID photo is required"),
  backId: z
    .any()
    .refine((file) => file instanceof File, "Back ID photo is required"),
});

export const clientGeolocationSchema = z.object({
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  address: z.string().optional(), // Can overwrite basic info address
});

export const createClientSchema = z.object({
  basicInfo: clientBasicInfoSchema,
  documents: clientDocumentSchema,
  geolocation: clientGeolocationSchema,
});

export type ClientBasicInfo = z.infer<typeof clientBasicInfoSchema>;
export type ClientDocuments = z.infer<typeof clientDocumentSchema>;
export type ClientGeolocation = z.infer<typeof clientGeolocationSchema>;
export type CreateClientFormData = z.infer<typeof createClientSchema>;
