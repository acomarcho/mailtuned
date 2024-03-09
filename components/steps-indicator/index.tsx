import { cn } from "@/lib/utils";
import React from "react";

const steps = ["SPF", "DKIM", "DMARC", "Tracking", "Redirect"];

export default function StepsIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="grid grid-cols-[32px_1fr_32px_1fr_32px_1fr_32px_1fr_32px] items-center">
      {steps.map((step, i) => {
        const stepIndex = i + 1;

        return (
          <React.Fragment key={step}>
            <div className="grid grid-cols-1 gap-2 relative">
              <div
                className={cn(
                  "grid place-items-center bg-slate-300 text-slate-9000 rounded-full w-8 h-8",
                  currentStep >= stepIndex && "bg-slate-900 text-slate-100"
                )}
              >
                {stepIndex}
              </div>
              <p className="text-center w-[120px] absolute left-[-44px] top-10 text-sm">
                {step}
              </p>
            </div>
            {stepIndex < steps.length && (
              <div
                className={cn(
                  "h-1 bg-slate-300",
                  currentStep > stepIndex && "bg-slate-900"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
