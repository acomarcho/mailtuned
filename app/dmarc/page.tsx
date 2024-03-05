import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DmarcPage() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Add DMARC records
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Please configure your DMARC settings.
      </p>
      <div className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Select protection level <span className="text-red-500">*</span>
        </h2>
        <RadioGroup
          defaultValue="soft-setup"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="soft-setup" id="soft-setup" />
            <label
              htmlFor="soft-setup"
              className="p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer"
            >
              <p className="font-bold text-xl">Soft Setup</p>
              <p className="mt-2">
                (Recommended) Everyone can send you emails, best for everything,
                especially cold-mail.
              </p>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hard-setup" id="hard-setup" />
            <label
              htmlFor="hard-setup"
              className="p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer"
            >
              <p className="font-bold text-xl">Hard Setup</p>
              <p className="mt-2">
                Users with no SPF, DKIM or DMARC might not able to send you an
                email. Most people don&apos;t!
              </p>
            </label>
          </div>
        </RadioGroup>
      </div>
      <div className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Select DMARC reporting <span className="text-red-500">*</span>
        </h2>
        <RadioGroup
          defaultValue="reporting-yes"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reporting-yes" id="reporting-yes" />
            <label
              htmlFor="reporting-yes"
              className="p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer"
            >
              <p className="font-bold text-xl">Yes</p>
              <p className="mt-2">
                (Recommended) You will constantly receive DMARC reports into
                your inbox on each email.
              </p>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reporting-no" id="reporting-no" />
            <label
              htmlFor="reporting-no"
              className="p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer"
            >
              <p className="font-bold text-xl">No</p>
              <p className="mt-2">
                You will lose visibility into email authentication, and may make
                it more difficult to identify and address any issues.
              </p>
            </label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="mt-12">
        Submit DMARC record!
      </Button>
    </div>
  );
}
