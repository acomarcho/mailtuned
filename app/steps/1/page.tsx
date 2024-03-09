import SpfPage from "@/app/spf/page";
import StepsIndicator from "@/components/steps-indicator";

export default function SpfStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <StepsIndicator currentStep={1} />
      </div>
      <SpfPage />;
    </>
  );
}
