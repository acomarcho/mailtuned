import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SpfPage() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add DKIM records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        All DKIM records have to be created manually, please follow provided
        steps if you don&apos;t know how! Time is automatically set to 1 hour.
      </p>
      <form className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">
              Type <span className="text-red-500">*</span>
            </label>
            <Input type="text" placeholder="Example: TXT" />
          </div>
          <div>
            <label htmlFor="">
              Host <span className="text-red-500">*</span>
            </label>
            <Input type="text" placeholder="Example: @" />
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="">
            Record value <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Example: v=DKIM1; p=76E629F05F70..."
          />
        </div>
        <Button type="submit" className="mt-8">Submit DKIM record!</Button>
      </form>
    </div>
  );
}
