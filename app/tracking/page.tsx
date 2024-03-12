import SetUpDomain from "@/components/set-up-domain/set-up-domain";
import TrackingButtons from "@/components/tracking/tracking-buttons";
import { cn } from "@/lib/utils";

export default function TrackingPage() {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", "shadow-md")}>
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Open Tracking
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Select your email software so that they can track your campaign
        progress.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <TrackingButtons />
      </div>
      <div className="bg-amber-50 p-4 mt-8 space-y-2">
        <p className="text-amber-600">Want to select your domains first?</p>
        <SetUpDomain />
      </div>
    </div>
  );
}
