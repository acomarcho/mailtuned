import SetUpApiKey from "@/components/home/set-up-api-key";

export default function Page() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
      <h1 className="uppercase tracking-widest font-bold text-xl">Mailtuned</h1>
      <h2 className="text-slate-500">GoDaddy DNS Toolkit</h2>
      <SetUpApiKey />
    </div>
  );
}
