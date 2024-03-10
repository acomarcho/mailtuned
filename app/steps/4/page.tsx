import DmarcPage from "@/app/dmarc/page";
import StepsButton from "@/components/steps-button";
import StepsIndicator from "@/components/steps-indicator";

export default function DmarcStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <StepsIndicator currentStep={4} />
      </div>
      <DmarcPage />
      <div className="max-w-wrapper mx-auto p-8">
        <StepsButton prevPage={3} nextPage={5} />
      </div>
    </>
  );
}
