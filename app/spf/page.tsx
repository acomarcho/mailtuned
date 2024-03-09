import SpfButtons from "@/components/spf/spf-buttons";
import { cn } from "@/lib/utils";

export default function SpfPage({
  className,
}: React.AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-wrapper p-8 mx-auto", className)}>
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add SPF records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Select your email provider. Your email provider is what platform you
        send emails from!
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <SpfButtons />
      </div>
    </div>
  );
}
