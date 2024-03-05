import { Button } from "@/components/ui/button";

export default function SpfPage() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add SPF records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Select your email provider. Your email provider is what platform you
        send emails from!
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Button className="py-8">Google (Workspace)</Button>
        <Button className="py-8">Microsoft (Outlook)</Button>
        <Button className="py-8">Namecheap (Privatemail)</Button>
        <Button className="py-8">Zoho</Button>
        <Button className="py-8">Stackmail</Button>
      </div>
    </div>
  );
}
