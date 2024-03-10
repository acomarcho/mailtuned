import DkimPage from "@/app/dkim/page";
import StepsButton from "@/components/steps-button";
import StepsIndicator from "@/components/steps-indicator";

export default function DkimStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <StepsIndicator currentStep={3} />
      </div>
      <DkimPage />
      <div className="max-w-wrapper mx-auto p-8">
        <StepsButton prevPage={2} nextPage={4} />
      </div>
    </>
  );
}
