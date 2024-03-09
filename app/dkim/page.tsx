import DkimForm from "@/components/dkim/form";
import { cn } from "@/lib/utils";

export default function DkimPage({
  className,
}: React.AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", className)}>
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
    </div>
  );
}
