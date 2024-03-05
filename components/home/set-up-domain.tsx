"use client";

import { apiKeyAtom } from "@/lib/atoms/api-key";
import { useAtomValue, useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { GetDomainsResponse } from "@/lib/types/response";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { domainAtom } from "@/lib/atoms/domain";

type DomainInput = {
  domain: string;
};

export default function SetUpDomain() {
  const apiKey = useAtomValue(apiKeyAtom);
  const [domain, setDomain] = useAtom(domainAtom);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { setValue, handleSubmit, reset, watch } = useForm<DomainInput>();
  const onSubmit: SubmitHandler<DomainInput> = (data) => {
    setDomain(data.domain);
    handleOpenChange(false);
    toast.success("Successfully set domain!");
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (isOpen) {
      reset({
        domain: domain ?? undefined,
      });
    }
  };

  const query = useQuery({
    queryKey: ["domains", apiKey],
    queryFn: async () => {
      try {
        const { data } = await axios.get<GetDomainsResponse>("/api/domains", {
          headers: {
            Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
          },
        });
        if (domain === undefined) {
          toast.success("Successfuly fetched your domains!");
        }
        return data.data;
      } catch (error) {
        toast.error(
          "Could not fetch your domains. Make sure you have inputted the correct API key!"
        );
        throw error;
      }
    },
    enabled: apiKey !== null,
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="mt-8 w-fit"
          disabled={apiKey === null || !query.isFetched}
        >
          Set up domain
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Set up domain</DialogTitle>
          <DialogDescription>
            Choose one of your domains that you want to use!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor=""
            className="text-xs uppercase tracking-wider font-medium text-slate-500 block"
          >
            Domain <span className="text-red-500">*</span>
          </label>
          <Select
            value={domain}
            onValueChange={(value) => setValue("domain", value)}
          >
            <SelectTrigger className="w-full mt-4">
              <SelectValue placeholder="Select a domain ..." />
            </SelectTrigger>
            <SelectContent>
              {query.data?.map((domain) => {
                return (
                  <SelectItem key={domain.domain} value={domain.domain}>
                    {domain.domain}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {!watch("domain") && (
            <p className="text-red-500 text-xs mt-2">
              You must choose a domain!
            </p>
          )}
          <Button
            type="submit"
            className="block mt-8"
            disabled={!watch("domain")}
          >
            Set domain
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
