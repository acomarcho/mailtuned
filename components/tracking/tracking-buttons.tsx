"use client";

import { apiKeyAtom } from "@/lib/atoms/api-key";
import { domainAtom } from "@/lib/atoms/domain";
import { PageStatus } from "@/lib/constants/page-status";
import axios, { AxiosError } from "axios";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const trackingPresets = [
  {
    label: "Smartlead",
    host: "emailtracking",
    data: "open.sleadtrack.com",
  },
  {
    label: "Instantly",
    host: "inst",
    data: "prox.itrackly.com",
  },
];

export default function TrackingButtons() {
  const apiKey = useAtomValue(apiKeyAtom);
  const domain = useAtomValue(domainAtom);

  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const handleUpdateTrackingRecord = async (preset: {
    label: string;
    host: string;
    data: string;
  }) => {
    if (!domain) {
      return;
    }

    setPageStatus(PageStatus.Loading);
    for (const domainName of domain.selectedDomains) {
      try {
        await axios.post(
          "/api/tracking",
          {
            domain: domainName,
            name: preset.host,
            data: preset.data,
          },
          {
            headers: {
              Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
            },
          }
        );
        toast.success(`[${domainName}] Successfully updated tracking record!`);
      } catch (error) {
        const defaultErrorText = `[${domainName}] An error occured while updating tracking record`;
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
      {trackingPresets.map((preset) => {
        return (
          <Button
            disabled={pageStatus === PageStatus.Loading || !isDomainDataReady}
            className="py-8"
            key={preset.label}
            onClick={() => handleUpdateTrackingRecord(preset)}
          >
            {preset.label} {pageStatus === PageStatus.Loading && "..."}
          </Button>
        );
      })}
    </>
  );
}
