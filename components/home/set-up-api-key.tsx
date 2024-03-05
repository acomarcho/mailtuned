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
import { useAtom } from "jotai";
import { apiKeyAtom } from "@/lib/atoms/api-key";
import { toast } from "sonner";
import { domainAtom } from "@/lib/atoms/domain";

type ApiKeyInput = {
  key: string;
  secret: string;
};

export default function SetUpApiKey() {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [domain, setDomain] = useAtom(domainAtom);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApiKeyInput>();
  const onSubmit: SubmitHandler<ApiKeyInput> = (data) => {
    setApiKey({
      key: data.key,
      secret: data.secret,
    });
    handleOpenChange(false);
    toast.success(
      "Successfully set API key! Your domain information has been reset."
    );
    if (domain) {
      setDomain(undefined);
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
            Put your API key in the field below!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor=""
            className="text-xs uppercase tracking-wider font-medium text-slate-500"
          >
            Key <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Example: 3mM44UdBeqoP6f_AyuZxePx3u2RCHVLN8e8bd"
            {...register("key", { required: true })}
            className="mt-2"
          />
          {errors.key && (
            <p className="text-red-500 text-xs mt-2">Key must be filled!</p>
          )}
          <label
            htmlFor=""
            className="text-xs uppercase tracking-wider font-medium text-slate-500 mt-4 inline-block"
          >
            Secret <span className="text-red-500">*</span>
          </label>
          <Input
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
          <Button type="submit" className="mt-4">
            Set API key
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
