"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { domainAtom } from "@/lib/atoms/domain";
import { useAtom } from "jotai";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function SetUpDomain() {
  const [domain, setDomain] = useAtom(domainAtom);

  const [domainSearch, setDomainSearch] = useState("");
  
  useEffect(() => {
    // Fallback: If users don't have domain.selectedDomains, set it as domain.domains
    if (domain !== undefined && domain.domains && !domain.selectedDomains) {
      setDomain({
        ...domain,
        selectedDomains: [...domain.domains],
      });
    }
  }, [domain, setDomain]);

  if (!domain || !domain.selectedDomains) {
    return <Button disabled>Select domains</Button>;
  }

  const filteredDomains = domain?.domains.filter((domain) =>
    domain.toLowerCase().includes(domainSearch.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Select domains</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[320px] overflow-y-scroll">
        <div className="sticky top-0 z-10 bg-white">
          <DropdownMenuItemAlternative>
            <div className="grid grid-cols-1 gap-2 w-full">
              <label htmlFor="domain-search">Search</label>
              <Input
                className="w-full"
                id="domain-search"
                placeholder="e.g. mailtuned.com"
                value={domainSearch}
                onChange={(e) => {
                  setDomainSearch(e.currentTarget.value);
                }}
              />
            </div>
          </DropdownMenuItemAlternative>
          <DropdownMenuItemAlternative>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  setDomain({
                    ...domain,
                    selectedDomains: [...filteredDomains],
                  });
                }}
              >
                Select all
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setDomain({
                    ...domain,
                    selectedDomains: [],
                  });
                }}
              >
                Remove all
              </Button>
            </div>
          </DropdownMenuItemAlternative>
          <DropdownMenuSeparator />
        </div>
        {filteredDomains?.map((d) => {
          return (
            <DropdownMenuItemAlternative key={d}>
              <Checkbox
                id={d}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setDomain({
                      ...domain,
                      selectedDomains: [...domain.selectedDomains, d],
                    });
                  } else {
                    setDomain({
                      ...domain,
                      selectedDomains: domain.selectedDomains.filter(
                        (innerDomain) =>
                          innerDomain.toLowerCase() !== d.toLowerCase()
                      ),
                    });
                  }
                }}
                checked={domain.selectedDomains.includes(d)}
              />
              <label htmlFor={d} className="pl-4 hover:cursor-pointer w-full">
                {d}
              </label>
            </DropdownMenuItemAlternative>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownMenuItemAlternative = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 hover:bg-slate-100 hover:cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};
