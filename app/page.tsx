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

export default function Page() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
      <h1 className="uppercase tracking-widest font-bold text-xl">Mailtuned</h1>
      <h2 className="text-slate-500">GoDaddy DNS Toolkit</h2>
      <Dialog>
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
          <form>
            <label
              htmlFor=""
              className="text-xs uppercase tracking-wider font-medium text-slate-500"
            >
              API key <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Paste/write your API key here ..." />
            <Button type="submit" className="mt-8">Set API key</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
