import MxButtons from "@/components/mx/mx-buttons";
import SetUpDomain from "@/components/set-up-domain/set-up-domain";
import { cn } from "@/lib/utils";

export default function MxPage() {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", "shadow-md")}>
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add MX records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        {
          "A DNS 'mail exchange' (MX) record directs email to a mail server. The MX record indicates how email messages should be routed in accordance with the Simple Mail Transfer Protocol."
        }
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <MxButtons />
      </div>
      <div className="bg-amber-50 p-4 mt-8 space-y-2">
        <p className="text-amber-600">Want to select your domains first?</p>
        <SetUpDomain />
      </div>
    </div>
  );
}
