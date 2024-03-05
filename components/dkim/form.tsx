"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PageStatus } from "@/lib/constants/page-status";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { domainAtom } from "@/lib/atoms/domain";
import { apiKeyAtom } from "@/lib/atoms/api-key";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type DkimInput = {
  type: string;
  host: string;
  data: string;
};

export default function DkimForm() {
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const apiKey = useAtomValue(apiKeyAtom);
  const domain = useAtomValue(domainAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DkimInput>();
  const onSubmit: SubmitHandler<DkimInput> = (data) => {
    handleUpdateDkimRecord(data);
  };

  const handleUpdateDkimRecord = async ({ type, host, data }: DkimInput) => {
    if (!domain) {
      return;
    }

    setPageStatus(PageStatus.Loading);
    for (const domainName of domain.domains) {
      try {
        await axios.post(
          "/api/dkim",
          {
            domain: domainName,
            name: host,
            type: type,
            data: data,
          },
          {
            headers: {
              Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
            },
          }
        );
        toast.success(`[${domainName}] Successfully updated DKIM record!`);
      } catch (error) {
        const defaultErrorText = `[${domainName}] An error occured while updating DKIM records`;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type">
            Type <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Example: TXT"
            {...register("type", { required: true })}
          />
          {errors.type && (
            <p className="text-red-500 text-xs mt-2">Type cannot be empty!</p>
          )}
        </div>
        <div>
          <label htmlFor="host">
            Host <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Example: @"
            {...register("host", { required: true })}
          />
          {errors.host && (
            <p className="text-red-500 text-xs mt-2">Host cannot be empty!</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="data">
          Record value <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Example: v=DKIM1; p=76E629F05F70..."
          {...register("data", { required: true })}
        />
        {errors.data && (
          <p className="text-red-500 text-xs mt-2">
            Record values cannot be empty!
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="mt-8"
        disabled={pageStatus === PageStatus.Loading}
      >
        Submit DKIM record! {pageStatus === PageStatus.Loading && "..."}
      </Button>
    </form>
  );
}
