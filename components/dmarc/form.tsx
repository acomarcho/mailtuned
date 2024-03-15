"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useForm } from "react-hook-form";
import { apiKeyAtom } from "@/lib/atoms/api-key";
import { domainAtom } from "@/lib/atoms/domain";
import { PageStatus } from "@/lib/constants/page-status";
import { useAtomValue } from "jotai";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";

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
  email: string;
};

export default function DmarcForm() {
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const apiKey = useAtomValue(apiKeyAtom);
  const domain = useAtomValue(domainAtom);

  const form = useForm<DmarcInput>({
    defaultValues: {
      setup: Setup.SoftSetup,
      reporting: Reporting.ReportingYes,
      email: "",
    },
  });

  const handleUpdateDkimRecord = async () => {
    if (!domain) {
      return;
    }

    setPageStatus(PageStatus.Loading);
    for (const domainName of domain.selectedDomains) {
      try {
        let data: string;
        const setup = form.watch("setup");
        const reporting = form.watch("reporting");
        const email = `${form.watch("email")}@${domainName}`;

        if (setup === Setup.SoftSetup && reporting === Reporting.ReportingYes) {
          data = `v=DMARC1;p=reject;sp=reject;pct=100;rua=mailto:${email};ri=86400;aspf=r;adkim=r;fo=1;`;
        } else if (
          setup === Setup.HardSetup &&
          reporting === Reporting.ReportingYes
        ) {
          data = `v=DMARC1;p=reject;sp=reject;pct=100;rua=mailto:${email};ri=86400;aspf=s;adkim=s;fo=1;`;
        } else if (
          setup === Setup.SoftSetup &&
          reporting === Reporting.ReportingNo
        ) {
          data =
            "v=DMARC1; p=reject; pct=100; sp=reject; ri=86400; aspf=r; adkim=r;";
        } else {
          data =
            "v=DMARC1; p=reject; sp=reject; pct=100; ri=86400; aspf=s; adkim=s;";
        }

        await axios.post(
          "/api/dmarc",
          {
            domain: domainName,
            data: data,
          },
          {
            headers: {
              Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
            },
          }
        );
        toast.success(`[${domainName}] Successfully updated DMARC record!`);
      } catch (error) {
        const defaultErrorText = `[${domainName}] An error occured while updating DMARC record`;
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.message
              ? `[${domainName}] ${error.response.data.message}`
              : defaultErrorText
          );
        } else {
          toast.error(defaultErrorText);
        }
      }
    }
    setPageStatus(PageStatus.None);
  };

  const isDomainDataReady =
    domain?.selectedDomains && domain.selectedDomains.length > 0;

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
              <p className="mt-2 text-sm">
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
              <p className="mt-2 text-sm">
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
              <p className="mt-2 text-sm">
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
              <p className="mt-2 text-sm">
                You will lose visibility into email authentication, and may make
                it more difficult to identify and address any issues.
              </p>
            </label>
          </div>
        </RadioGroup>
        {form.watch("reporting") === Reporting.ReportingYes && (
          <div className="mt-8">
            <label
              htmlFor="host"
              className="font-bold uppercase tracking-wider"
            >
              Reporting email <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Example: bob"
              onChange={(e) => form.setValue("email", e.currentTarget.value)}
              value={form.watch("email")}
            />
            <p className="text-amber-500 text-xs mt-2">
              If you enter &apos;bob&apos; then reports will be sent to
              bob@yourdomain (i.e. if your domain is mailtuned.com, it will be
              sent to mailtuned.com)
            </p>
            {form.watch("email") === "" && (
              <p className="text-red-500 text-xs mt-2">
                Email cannot be empty!
              </p>
            )}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="mt-12"
        onClick={() => handleUpdateDkimRecord()}
        disabled={
          (form.watch("reporting") !== Reporting.ReportingNo &&
            form.watch("email") === "") ||
          pageStatus === PageStatus.Loading ||
          !isDomainDataReady
        }
      >
        Submit DMARC record! {pageStatus === PageStatus.Loading && "..."}
      </Button>
    </>
  );
}
