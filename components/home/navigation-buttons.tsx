"use client";

import { useAtomValue } from "jotai";
import { Button } from "../ui/button";
import { domainAtom } from "@/lib/atoms/domain";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const noDomainErrorMessage =
  "Please finish your API key set up before continuing!";

export default function NavigationButtons() {
  const domain = useAtomValue(domainAtom);
  const isDomainSelected = domain !== undefined;

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
      <Button
        className="bg-amber-200 text-amber-900 w-full uppercase font-bold tracking-widest hover:bg-amber-400"
        onClick={() => {
          if (!isDomainSelected) {
            return toast.error(noDomainErrorMessage);
          }
          router.push("/spf");
        }}
      >
        (1) Add SPF
      </Button>
      <Button
        className="bg-rose-200 text-rose-900 w-full uppercase font-bold tracking-widest hover:bg-rose-400"
        onClick={() => {
          if (!isDomainSelected) {
            return toast.error(noDomainErrorMessage);
          }
          router.push("/mx");
        }}
      >
        (2) Add MX records
      </Button>
      <Button
        className="bg-lime-200 text-lime-900 w-full uppercase font-bold tracking-widest hover:bg-lime-400"
        onClick={() => {
          if (!isDomainSelected) {
            return toast.error(noDomainErrorMessage);
          }
          router.push("/dkim");
        }}
      >
        (3) Add DKIM
      </Button>
      <Button
        className="bg-purple-200 text-purple-900 w-full uppercase font-bold tracking-widest hover:bg-purple-400"
        onClick={() => {
          if (!isDomainSelected) {
            return toast.error(noDomainErrorMessage);
          }
          router.push("/dmarc");
        }}
      >
        (4) Add DMARC
      </Button>
      <Button
        className="bg-pink-200 text-pink-900 w-full uppercase font-bold tracking-widest hover:bg-pink-400"
        onClick={() => {
          if (!isDomainSelected) {
            return toast.error(noDomainErrorMessage);
          }
          router.push("/tracking");
        }}
      >
        (5) Add tracking
      </Button>
      <Button
        className="bg-sky-200 text-sky-900 w-full uppercase font-bold tracking-widest hover:bg-sky-400"
        onClick={() => {
          if (!isDomainSelected) {
            return toast.error(noDomainErrorMessage);
          }
          router.push("/redirect");
        }}
      >
        (6) Add redirect
      </Button>
    </>
  );
}
