"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClientBasicInfo, ClientDocuments, ClientGeolocation } from "@/lib/schemas/client-wizard";

  // Placeholder components for steps (will be implemented next)
import ClientBasicInfoStep from "./wizard/ClientBasicInfoStep";
import ClientDocumentUploadStep from "./wizard/ClientDocumentUploadStep";
import ClientGeolocationStep from "./wizard/ClientGeolocationStep";
import { mergeIdImages } from "@/lib/utils/image-merger";
import { createClientAction } from "@/actions/clients";

type Step = 1 | 2 | 3;

export default function CreateClientWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    basicInfo?: ClientBasicInfo;
    documents?: ClientDocuments;
    geolocation?: ClientGeolocation;
  }>({});

  const handleBasicInfoSubmit = (data: ClientBasicInfo) => {
    setFormData((prev) => ({ ...prev, basicInfo: data }));
    setStep(2);
  };

  const handleDocumentsSubmit = (data: ClientDocuments) => {
    setFormData((prev) => ({ ...prev, documents: data }));
    setStep(3);
  };

  const handleGeolocationSubmit = async (data: ClientGeolocation) => {
    const finalData = {
      ...formData,
      geolocation: data,
    };
    
    // Validate we have all data
    if (!finalData.basicInfo || !finalData.documents) {
        setSubmitError("Missing required data. Please go back and complete all steps.");
        return;
    }

    
        setIsSubmitting(true);
        setSubmitError(null);

        // 1. Merge images
        const mergedImageBlob = await mergeIdImages(
            finalData.documents.frontId,
            finalData.documents.backId
        );

        // 2. Prepare FormData
        const submitFormData = new FormData();
        submitFormData.append("name", finalData.basicInfo.fullName);
        submitFormData.append("cedula", finalData.basicInfo.cedula);
        submitFormData.append("phone", finalData.basicInfo.phone);
        submitFormData.append("address", finalData.geolocation.address || finalData.basicInfo.address);
        
        if (finalData.geolocation.latitude) {
            submitFormData.append("latitude", finalData.geolocation.latitude.toString());
        }
        if (finalData.geolocation.longitude) {
            submitFormData.append("longitude", finalData.geolocation.longitude.toString());
        }

        submitFormData.append("status", "active");
        
        // Append merged file
        submitFormData.append("photo", mergedImageBlob, "id-merged.jpg");

        // 3. Call Server Action
        console.log("Calling Server Action...");
        const result = await createClientAction(submitFormData);

        if (result.success) {
            // 4. Redirect on success
            router.push("/clients");
            router.refresh();
        } else {
            //setSubmitError('error' in result ? (result as unknown as { error: string }).error : "An error occurred");
            setSubmitError(result.error ?? "An error occurred");
        }

   
        setIsSubmitting(false);
    
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Client</h1>
        <p className="text-muted-foreground mt-2">
          Step {step} of 3
        </p>
        <div className="w-full bg-secondary h-2 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Personal Details"}
            {step === 2 && "Upload ID Documents"}
            {step === 3 && "Geolocation Capture"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Please enter the client's legal information."}
            {step === 2 && "Ensure ID is well-lit and text is readable."}
            {step === 3 && "Verified location data helps in accurate service delivery."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitError && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
                  {submitError}
              </div>
          )}
          {step === 1 && (
            <ClientBasicInfoStep 
              defaultValues={formData.basicInfo} 
              onNext={handleBasicInfoSubmit} 
              onBack={() => router.push("/clients")}
            />
          )}
          {step === 2 && (
            <ClientDocumentUploadStep 
              defaultValues={formData.documents}
              onNext={handleDocumentsSubmit}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <ClientGeolocationStep 
              defaultValues={formData.geolocation}
              basicInfoAddress={formData.basicInfo?.address}
              onSubmit={handleGeolocationSubmit}
              onBack={() => setStep(2)}
              isSubmitting={isSubmitting}
            />
          )}
        </CardContent>
      </Card>
      
      {/* Dev debug info */}
      {/* <pre className="mt-8 p-4 bg-muted rounded text-xs">{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
}
