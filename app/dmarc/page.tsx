import DmarcForm from "@/components/dmarc/form";
import { cn } from "@/lib/utils";

export default function DmarcPage({
  className,
}: React.AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", className)}>
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add DMARC records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Please configure your DMARC settings.
      </p>
      <DmarcForm />
    </div>
  );
}
