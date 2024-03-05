"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useForm } from "react-hook-form";

enum Setup {
  SoftSetup = "soft-setup",
  HardSetup = "hard-setup",
}

enum Reporting {
  ReportingYes = "reporting-yes",
  ReportingNo = "reporting-no",
}

type DmarcInput = {
  setup: string;
  reporting: string;
};

export default function DmarcForm() {
  const form = useForm<DmarcInput>();

  return (
    <>
      <div className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Select protection level <span className="text-red-500">*</span>
        </h2>
        <RadioGroup
          defaultValue={Setup.SoftSetup}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2"
          onValueChange={(v) => {
            form.setValue("setup", v);
          }}
          value={form.watch("setup")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={Setup.SoftSetup} id={Setup.SoftSetup} />
            <label
              htmlFor={Setup.SoftSetup}
              className={cn(
                "p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer",
                form.watch("setup") !== Setup.SoftSetup &&
                  "bg-slate-200 text-slate-800 hover:bg-slate-300"
              )}
            >
              <p className="font-bold text-xl">Soft Setup</p>
              <p className="mt-2">
                (Recommended) Everyone can send you emails, best for everything,
                especially cold-mail.
              </p>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={Setup.HardSetup} id={Setup.HardSetup} />
            <label
              htmlFor={Setup.HardSetup}
              className={cn(
                "p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer",
                form.watch("setup") !== Setup.HardSetup &&
                  "bg-slate-200 text-slate-800 hover:bg-slate-300"
              )}
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
          defaultValue={Reporting.ReportingYes}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2"
          onValueChange={(v) => {
            form.setValue("reporting", v);
          }}
          value={form.watch("reporting")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={Reporting.ReportingYes}
              id={Reporting.ReportingYes}
            />
            <label
              htmlFor={Reporting.ReportingYes}
              className={cn(
                "p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer",
                form.watch("reporting") !== Reporting.ReportingYes &&
                  "bg-slate-200 text-slate-800 hover:bg-slate-300"
              )}
            >
              <p className="font-bold text-xl">Yes</p>
              <p className="mt-2">
                (Recommended) You will constantly receive DMARC reports into
                your inbox on each email.
              </p>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={Reporting.ReportingNo}
              id={Reporting.ReportingNo}
            />
            <label
              htmlFor={Reporting.ReportingNo}
              className={cn(
                "p-4 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:cursor-pointer",
                form.watch("reporting") !== Reporting.ReportingNo &&
                  "bg-slate-200 text-slate-800 hover:bg-slate-300"
              )}
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
    </>
  );
}
