import DmarcPage from "@/app/dmarc/page";
import StepsButton from "@/components/steps-button";
import StepsIndicator from "@/components/steps-indicator";

export default function DmarcStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <StepsIndicator currentStep={3} />
      </div>
      <DmarcPage />
      <div className="max-w-wrapper mx-auto p-8">
        <StepsButton prevPage={2} nextPage={4} />
      </div>
    </>
  );
}
