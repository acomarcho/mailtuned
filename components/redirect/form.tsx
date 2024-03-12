"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { apiKeyAtom } from "@/lib/atoms/api-key";
import { domainAtom } from "@/lib/atoms/domain";
import { PageStatus } from "@/lib/constants/page-status";
import { useState } from "react";
import { useAtomValue } from "jotai";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type RedirectInput = {
  domain: string;
};

export default function RedirectForm() {
  const apiKey = useAtomValue(apiKeyAtom);
  const domain = useAtomValue(domainAtom);

  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RedirectInput>();

  const onSubmit: SubmitHandler<RedirectInput> = async (data) => {
    console.log("terpanggil");

    if (!domain) {
      return;
    }

    setPageStatus(PageStatus.Loading);
    for (const domainName of domain.selectedDomains) {
      try {
        await axios.post(
          "/api/redirect",
          {
            domain: domainName,
            targetDomain: data.domain,
          },
          {
            headers: {
              Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
            },
          }
        );
        toast.success(`[${domainName}] Successfully updated redirect record!`);
      } catch (error) {
        const defaultErrorText = `[${domainName}] An error occured while updating redirect record`;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="domain"
        className="text-xs uppercase tracking-wider font-medium text-slate-500"
      >
        Domain <span className="text-red-500">*</span>
      </label>
      <Input
        id="domain"
        className="mt-2"
        placeholder="Example: mailtuned.com"
        {...register("domain", { required: true })}
      />
      <p className="text-amber-700 text-xs mt-2">
        Do not put &apos;www&apos; in front, just input the domain name!
      </p>
      {errors.domain && (
        <p className="text-red-500 text-xs mt-2">Domain must be filled!</p>
      )}
      <Button
        type="submit"
        className="mt-4"
        disabled={pageStatus === PageStatus.Loading || !isDomainDataReady}
      >
        Set up redirect {pageStatus === PageStatus.Loading && "..."}
      </Button>
    </form>
  );
}
