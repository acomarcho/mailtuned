import NavigationButtons from "@/components/home/navigation-buttons";
import SetUpApiKey from "@/components/home/set-up-api-key";
import SetUpDomain from "@/components/home/set-up-domain";

export default function Page() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h1 className="uppercase tracking-widest font-bold text-xl">
            Mailtuned
          </h1>
          <h2 className="text-slate-500">GoDaddy DNS Toolkit</h2>
          <div className="flex gap-4">
            <SetUpApiKey />
            <SetUpDomain />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <NavigationButtons />
        </div>
      </div>
    </div>
  );
}
