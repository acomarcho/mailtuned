import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RedirectPage() {
  return (
    <div className="max-w-wrapper p-8 mx-auto">
      <h1 className="font-bold uppercase text-xl tracking-widest">
        Redirect your domain
      </h1>
      <p className="text-slate-500 text-sm mt-2">
        Add your website that you want all the domains to be redirected to!
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <form>
          <label
            htmlFor="domain"
            className="text-xs uppercase tracking-wider font-medium text-slate-500"
          >
            Domain <span className="text-red-500">*</span>
          </label>
          <Input
            id="domain"
            className="mt-2"
            placeholder="Example: mailtuned.com"
          />
          <Button type="submit" className="mt-4">
            Set up redirect
          </Button>
        </form>
      </div>
    </div>
  );
}
