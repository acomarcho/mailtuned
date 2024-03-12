import DmarcForm from "@/components/dmarc/form";
import SetUpDomain from "@/components/set-up-domain/set-up-domain";
import { cn } from "@/lib/utils";

export default function DmarcPage() {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", "shadow-md")}>
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add DMARC records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Please configure your DMARC settings.
      </p>
      <DmarcForm />
      <div className="bg-amber-50 p-4 mt-8 space-y-2">
        <p className="text-amber-600">Want to select your domains first?</p>
        <SetUpDomain />
      </div>
    </div>
  );
}
