import { z } from "zod";

export const clientBasicInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  cedula: z
    .string()
    .min(6, "Cedula must be at least 6 characters")
    .max(12, "Cedula must be at most 12 characters"), // Adjust validation based on real format
  phone: z.string().length(10, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  secondaryPhone: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  maritalStatus: z
    .enum(["single", "married", "union", "divorced", "widowed"])
    .optional(),
});

export const clientDocumentSchema = z.object({
  frontId: z.custom<File>(
    (val) => val instanceof File,
    "Front ID photo is required",
  ),
  backId: z.custom<File>(
    (val) => val instanceof File,
    "Back ID photo is required",
  ),
});

export const clientGeolocationSchema = z
  .object({
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(255, "Address must be at most 255 characters"),
  })
  .superRefine((value, context) => {
    if (value.latitude === null) {
      context.addIssue({
        code: "custom",
        message: "Please select a location on the map",
        path: ["latitude"],
      });
    }

    if (value.longitude === null) {
      context.addIssue({
        code: "custom",
        message: "Please select a location on the map",
        path: ["longitude"],
      });
    }
  });

export const clientFinancialInfoSchema = z.object({
  occupation: z.string().optional(),
  companyName: z.string().optional(),
  monthlyIncome: z.number().optional(),
  incomeSource: z
    .enum(["employed", "independent", "business_owner", "informal", "other"])
    .optional(),
});

export const clientReferencesSchema = z.object({
  referenceName: z.string().optional(),
  referencePhone: z.string().optional(),
  referenceRelationship: z.string().optional(),
});

export const createClientSchema = z.object({
  basicInfo: clientBasicInfoSchema,
  financialInfo: clientFinancialInfoSchema.optional(),
  references: clientReferencesSchema.optional(),
  documents: clientDocumentSchema,
  geolocation: clientGeolocationSchema,
});

export type ClientBasicInfo = z.infer<typeof clientBasicInfoSchema>;
export type ClientFinancialInfo = z.infer<typeof clientFinancialInfoSchema>;
export type ClientReferences = z.infer<typeof clientReferencesSchema>;
export type ClientDocuments = z.infer<typeof clientDocumentSchema>;
export type ClientGeolocation = z.infer<typeof clientGeolocationSchema>;
export type CreateClientFormData = z.infer<typeof createClientSchema>;
