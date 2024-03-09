import DkimPage from "@/app/dkim/page";
import StepsButton from "@/components/steps-button";
import StepsIndicator from "@/components/steps-indicator";

export default function DkimStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <StepsIndicator currentStep={2} />
      </div>
      <DkimPage className="shadow-md" />
      <div className="max-w-wrapper mx-auto p-8">
        <StepsButton prevPage={1} nextPage={3} />
      </div>
    </>
  );
}
