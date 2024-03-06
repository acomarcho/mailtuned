"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { apiKeyAtom } from "@/lib/atoms/api-key";
import { toast } from "sonner";
import { domainAtom } from "@/lib/atoms/domain";
import { PageStatus } from "@/lib/constants/page-status";
import { GetDomainsResponse } from "@/lib/types/response";
import axios from "axios";

type ApiKeyInput = {
  key: string;
  secret: string;
};

export default function SetUpApiKey() {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const setDomain = useSetAtom(domainAtom);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApiKeyInput>();
  const onSubmit: SubmitHandler<ApiKeyInput> = async (data) => {
    try {
      setPageStatus(PageStatus.Loading);

      setApiKey({
        key: data.key,
        secret: data.secret,
      });

      const { data: domainsData } = await axios.get<GetDomainsResponse>(
        "/api/domains",
        {
          headers: {
            Authorization: `sso-key ${data.key}:${data.secret}`,
          },
        }
      );

      toast.success("Your API key has been set successfully!");

      setDomain({ domains: domainsData.data.map((domain) => domain.domain) });
    } catch (error) {
      toast.error(
        "Your API key cannot be authorized by GoDaddy! Make sure you have inputted the correct one!"
      );
      setDomain(undefined);
    } finally {
      setPageStatus(PageStatus.None);
      handleOpenChange(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (isOpen) {
      reset({
        key: apiKey?.key || "",
        secret: apiKey?.secret || "",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-8 w-fit">Set up API key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Set up API key</DialogTitle>
          <DialogDescription>
            <p>
              In order to add records for you. we need access to your GoDaddy
              API key.
            </p>
            <p className="text-yellow-700 mt-2 text-xs">
              Don&apos;t worry, our server doesn&apos;t save any of your key! It
              is stored locally inside your web browser.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="key"
            className="text-xs uppercase tracking-wider font-medium text-slate-500"
          >
            Key <span className="text-red-500">*</span>
          </label>
          <Input
            id="key"
            placeholder="Example: 3mM44UdBeqoP6f_AyuZxePx3u2RCHVLN8e8bd"
            {...register("key", { required: true })}
            className="mt-2"
          />
          {errors.key && (
            <p className="text-red-500 text-xs mt-2">Key must be filled!</p>
          )}
          <label
            htmlFor="secret"
            className="text-xs uppercase tracking-wider font-medium text-slate-500 mt-4 inline-block"
          >
            Secret <span className="text-red-500">*</span>
          </label>
          <Input
            id="secret"
            placeholder="Example: Ln7Wn7wvicPzAQiuGxVa8Q"
            {...register("secret", { required: true })}
            className="mt-2"
          />
          {errors.secret && (
            <p className="text-red-500 text-xs mt-2">Secret must be filled!</p>
          )}
          <p className="text-yellow-700 text-xs mt-6">
            Changing your API key will reset your selected domain if you have it
            set already. You have to set it up again.
          </p>
          <Button
            type="submit"
            className="mt-4"
            disabled={pageStatus === PageStatus.Loading}
          >
            Set API key {pageStatus === PageStatus.Loading && "..."}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
