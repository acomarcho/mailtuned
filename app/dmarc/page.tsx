import DmarcForm from "@/components/dmarc/form";

export default function DmarcPage() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
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
