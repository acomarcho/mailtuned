"use client";

import { apiKeyAtom } from "@/lib/atoms/api-key";
import { Button } from "../ui/button";
import { domainAtom } from "@/lib/atoms/domain";
import { useAtomValue } from "jotai";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { PageStatus } from "@/lib/constants/page-status";

type MxPresetData = {
  value: string;
  priority: number;
};

const mxPresets = [
  {
    label: "Google",
    data: [
      {
        value: "smtp.google.com",
        priority: 1,
      },
    ],
  },
  {
    label: "Namecheap Privatemail",
    data: [
      {
        value: "mx1.privateemail.com",
        priority: 10,
      },
      {
        value: "mx2.privateemail.com",
        priority: 10,
      },
    ],
  },
  {
    label: "Zoho",
    data: [
      {
        value: "mx.zoho.com",
        priority: 10,
      },
      {
        value: "mx2.zoho.com",
        priority: 20,
      },
      {
        value: "mx3.zoho.com",
        priority: 50,
      },
    ],
  },
];

export default function MxButtons() {
  const apiKey = useAtomValue(apiKeyAtom);
  const domain = useAtomValue(domainAtom);

  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const handleUpdateSpfRecord = async (preset: {
    label: string;
    data: MxPresetData[];
  }) => {
    if (!domain) {
      return;
    }

    setPageStatus(PageStatus.Loading);
    for (const domainName of domain.domains) {
      try {
        await axios.post(
          "/api/mx",
          {
            domain: domainName,
            data: preset.data,
          },
          {
            headers: {
              Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
            },
          }
        );
        toast.success(`[${domainName}] Successfully updated MX records!`);
      } catch (error) {
        const defaultErrorText = `[${domainName}] An error occured while updating MX records`;
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
    <>
      {mxPresets.map((preset) => {
        return (
          <Button
            disabled={pageStatus === PageStatus.Loading}
            className="py-8 whitespace-normal"
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
