import RedirectForm from "@/components/redirect/form";
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <RedirectForm />
      </div>
    </div>
  );
}
