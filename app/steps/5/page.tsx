import RedirectPage from "@/app/redirect/page";
import StepsButton from "@/components/steps-button";
import StepsIndicator from "@/components/steps-indicator";

export default function RedirectStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <StepsIndicator currentStep={5} />
      </div>
      <RedirectPage className="shadow-md" />
      <div className="max-w-wrapper mx-auto p-8">
        <StepsButton prevPage={4} nextPage={null} />
      </div>
    </>
  );
}
