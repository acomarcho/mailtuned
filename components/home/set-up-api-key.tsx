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

type ApiKeyInput = {
  apiKey: string;
};

export default function SetUpApiKey() {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApiKeyInput>();
  const onSubmit: SubmitHandler<ApiKeyInput> = (data) => {
    setApiKey({
      apiKey: data.apiKey,
    });
    handleOpenChange(false);
    toast.success("Successfully set API key!");
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (isOpen) {
      reset({
        apiKey: apiKey?.apiKey || "",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-8">Set up API key</Button>
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
            API key <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Paste/write your API key here ..."
            {...register("apiKey", { required: true })}
            className="mt-2"
          />
          {errors.apiKey && (
            <p className="text-red-500 text-xs mt-2">API key must be filled!</p>
          )}
          <Button type="submit" className="mt-8">
            Set API key
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
