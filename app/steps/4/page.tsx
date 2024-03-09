import TrackingPage from "@/app/tracking/page";
import StepsButton from "@/components/steps-button";
import StepsIndicator from "@/components/steps-indicator";

export default function TrackingStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <StepsIndicator currentStep={4} />
      </div>
      <TrackingPage />
      <div className="max-w-wrapper mx-auto p-8">
        <StepsButton prevPage={3} nextPage={5} />
      </div>
    </>
  );
}
