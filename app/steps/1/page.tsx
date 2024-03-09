import SpfPage from "@/app/spf/page";

export default function SpfStepPage() {
  return (
    <>
      <div className="max-w-wrapper mx-auto p-8 mb-4">
        <div className="grid grid-cols-[32px_1fr_32px_1fr_32px_1fr_32px_1fr_32px] items-center">
          <div className="grid grid-cols-1 gap-2 relative">
            <div className="grid place-items-center bg-slate-900 text-slate-100 rounded-full w-8 h-8">
              1
            </div>
            <p className="text-center w-[120px] absolute left-[-44px] top-10 text-sm">
              SPF
            </p>
          </div>
          <div className="h-1 bg-slate-300" />
          <div className="grid grid-cols-1 gap-2 relative">
            <div className="grid place-items-center bg-slate-300 text-slate-900 rounded-full w-8 h-8">
              2
            </div>
            <p className="text-center w-[120px] absolute left-[-44px] top-10 text-sm">
              DKIM
            </p>
          </div>
          <div className="h-1 bg-slate-300" />
          <div className="grid grid-cols-1 gap-2 relative">
            <div className="grid place-items-center bg-slate-300 text-slate-900 rounded-full w-8 h-8">
              3
            </div>
            <p className="text-center w-[120px] absolute left-[-44px] top-10 text-sm">
              DMARC
            </p>
          </div>
          <div className="h-1 bg-slate-300" />
          <div className="grid grid-cols-1 gap-2 relative">
            <div className="grid place-items-center bg-slate-300 text-slate-900 rounded-full w-8 h-8">
              4
            </div>
            <p className="text-center w-[120px] absolute left-[-44px] top-10 text-sm">
              Tracking
            </p>
          </div>
          <div className="h-1 bg-slate-300" />
          <div className="grid grid-cols-1 gap-2 relative">
            <div className="grid place-items-center bg-slate-300 text-slate-900 rounded-full w-8 h-8">
              5
            </div>
            <p className="text-center w-[120px] absolute left-[-44px] top-10 text-sm">
              Redirect
            </p>
          </div>
        </div>
      </div>
      <SpfPage />;
    </>
  );
}
