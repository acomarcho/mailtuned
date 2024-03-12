import DkimForm from "@/components/dkim/form";
import SetUpDomain from "@/components/set-up-domain/set-up-domain";
import { cn } from "@/lib/utils";

export default function DkimPage() {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", "shadow-md")}>
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add DKIM records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        All DKIM records have to be created manually, please follow provided
        steps if you don&apos;t know how! Time is automatically set to 1 hour.
      </p>
      <div className="mt-8">
        <DkimForm />
      </div>
      <div className="bg-amber-50 p-4 mt-8 space-y-2">
        <p className="text-amber-600">Want to select your domains first?</p>
        <SetUpDomain />
      </div>
    </div>
  );
}
