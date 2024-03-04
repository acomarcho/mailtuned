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

export default function SetUpDomain() {
  const apiKey = useAtomValue(apiKeyAtom);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8 w-fit" disabled={apiKey === null}>
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
          <Button type="submit" className="block mt-8">
            Set API key
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
