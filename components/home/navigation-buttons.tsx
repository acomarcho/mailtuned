"use client";

import { useAtomValue } from "jotai";
import { Button } from "../ui/button";
import { domainAtom } from "@/lib/atoms/domain";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const noDomainErrorMessage =
  "Please finish your API key set up before continuing! Make sure you have selected at least one domain too!";

const steps = [
  {
    label: "Add SPF",
    href: "/spf",
    className:
      "bg-amber-200 text-amber-900 w-full uppercase font-bold tracking-widest hover:bg-amber-400",
  },
  {
    label: "Add MX records",
    href: "/mx",
    className:
      "bg-rose-200 text-rose-900 w-full uppercase font-bold tracking-widest hover:bg-rose-400",
  },
  {
    label: "Add DKIM",
    href: "/dkim",
    className:
      "bg-lime-200 text-lime-900 w-full uppercase font-bold tracking-widest hover:bg-lime-400",
  },
  {
    label: "Add DMARC",
    href: "/dmarc",
    className:
      "bg-purple-200 text-purple-900 w-full uppercase font-bold tracking-widest hover:bg-purple-400",
  },
  {
    label: "Add tracking",
    href: "/tracking",
    className:
      "bg-pink-200 text-pink-900 w-full uppercase font-bold tracking-widest hover:bg-pink-400",
  },
  {
    label: "Add redirect",
    href: "/redirect",
    className:
      "bg-sky-200 text-sky-900 w-full uppercase font-bold tracking-widest hover:bg-sky-400",
  },
];

export default function NavigationButtons() {
  const domain = useAtomValue(domainAtom);
  const isDomainSelected =
    domain !== undefined &&
    domain.selectedDomains &&
    domain.selectedDomains.length > 0;

  const router = useRouter();

  return (
    <>
      <Button
        className="bg-slate-900 text-slate-200 w-full uppercase font-bold tracking-widest hover:bg-slate-600"
        onClick={() => {
          if (!isDomainSelected) {
            return toast.error(noDomainErrorMessage);
          }
          router.push("/steps/1");
        }}
      >
        Add All
      </Button>
      <p className="text-slate-500">or you can add them one by one!</p>
      {steps.map((step, i) => {
        return (
          <Button
            className={step.className}
            key={step.href}
            onClick={() => {
              if (!isDomainSelected) {
                return toast.error(noDomainErrorMessage);
              }
              router.push(step.href);
            }}
          >
            ({i + 1}) {step.label}
          </Button>
        );
      })}
    </>
  );
}
