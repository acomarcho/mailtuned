import SetUpApiKey from "@/components/home/set-up-api-key";
import SetUpDomain from "@/components/home/set-up-domain";
import { Button } from "@/components/ui/button";

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
          <Button className="bg-slate-900 text-slate-200 w-full uppercase font-bold tracking-widest hover:bg-slate-600">
            (1) Add All
          </Button>
          <Button className="bg-amber-200 text-amber-900 w-full uppercase font-bold tracking-widest hover:bg-amber-400">
            (2) Add SPF
          </Button>
          <Button className="bg-lime-200 text-lime-900 w-full uppercase font-bold tracking-widest hover:bg-lime-400">
            (3) Add DKIM
          </Button>
          <Button className="bg-purple-200 text-purple-900 w-full uppercase font-bold tracking-widest hover:bg-purple-400">
            (4) Add DMAC
          </Button>
          <Button className="bg-pink-200 text-pink-900 w-full uppercase font-bold tracking-widest hover:bg-pink-400">
            (5) Add tracking
          </Button>
          <Button className="bg-sky-200 text-sky-900 w-full uppercase font-bold tracking-widest hover:bg-sky-400">
            (6) Add redirect
          </Button>
        </div>
      </div>
    </div>
  );
}
