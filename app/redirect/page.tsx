import RedirectForm from "@/components/redirect/form";
import SetUpDomain from "@/components/set-up-domain/set-up-domain";
import { cn } from "@/lib/utils";

export default function RedirectPage() {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", "shadow-md")}>
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Redirect your domain
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Add your website that you want all the domains to be redirected to!
      </p>
      <div className="mt-8">
        <RedirectForm />
      </div>
      <div className="bg-amber-50 p-4 mt-8 space-y-2">
        <p className="text-amber-600">Want to select your domains first?</p>
        <SetUpDomain />
      </div>
    </div>
  );
}
