import TrackingButtons from "@/components/tracking/tracking-buttons";

export default function TrackingPage() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
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
    </div>
  );
}
