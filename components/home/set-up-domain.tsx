"use client";

import { apiKeyAtom } from "@/lib/atoms/api-key";
import { useAtomValue } from "jotai";
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

export default function SetUpDomain() {
  const apiKey = useAtomValue(apiKeyAtom);

  const query = useQuery({
    queryKey: ["domains", apiKey],
    queryFn: async () => {
      try {
        const { data } = await axios.get<GetDomainsResponse>("/api/domains", {
          headers: {
            Authorization: `sso-key ${apiKey?.key}:${apiKey?.secret}`,
          },
        });
        toast.success("Successfuly fetched your domains!");
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
    <Dialog>
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
        <form>
          <label
            htmlFor=""
            className="text-xs uppercase tracking-wider font-medium text-slate-500 block"
          >
            Domain <span className="text-red-500">*</span>
          </label>
          <Select>
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
          <Button type="submit" className="block mt-8">
            Set API key
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
