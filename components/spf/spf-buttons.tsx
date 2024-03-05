"use client";

import { apiKeyAtom } from "@/lib/atoms/api-key";
import { Button } from "../ui/button";
import { domainAtom } from "@/lib/atoms/domain";
import { useAtomValue } from "jotai";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { PageStatus } from "@/lib/constants/page-status";

const spfPresets = [
  {
    label: "Google (Workspace)",
    data: "v=spf1 include:_spf.google.com ~all",
  },
  {
    label: "Microsoft (Outlook)",
    data: "v=spf1 include:spf.protection.outlook.com -all",
  },
  {
    label: "Namecheap (Privatemail)",
    data: "v=spf1 include:spf.privateemail.com ~all",
  },
  {
    label: "Zoho",
    data: "v=spf1 include:zoho.com -all",
  },
  {
    label: "Stackmail",
    data: "v=spf1 include:spf.stackmail.com -all",
  },
];

export default function SpfButtons() {
  const apiKey = useAtomValue(apiKeyAtom);
  const domain = useAtomValue(domainAtom);

  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const handleUpdateSpfRecord = async (preset: {
    label: string;
    data: string;
  }) => {
    try {
      setPageStatus(PageStatus.Loading);
      await axios.post(
        "/api/spf",
        {
          domain: domain,
          data: preset.data,
        },
        {
          headers: {
            Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
          },
        }
      );
      toast.success("Successfully updated SPF record!");
    } catch (error) {
      const defaultErrorText = "An error occured while updating SPF records.";
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || defaultErrorText);
      } else {
        toast.error(defaultErrorText);
      }
    } finally {
      setPageStatus(PageStatus.None);
    }
  };

  return (
    <>
      {spfPresets.map((preset) => {
        return (
          <Button
            disabled={pageStatus === PageStatus.Loading}
            className="py-8"
            key={preset.label}
            onClick={() => handleUpdateSpfRecord(preset)}
          >
            {preset.label} {pageStatus === PageStatus.Loading && "..."}
          </Button>
        );
      })}
    </>
  );
}
