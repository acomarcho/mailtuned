"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { domainAtom } from "@/lib/atoms/domain";
import { useAtomValue } from "jotai";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function SetUpDomain() {
  const domains = useAtomValue(domainAtom);

  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      console.log(dropdownRef.current);
      dropdownRef.current.addEventListener("keydown", (e) =>
        e.stopPropagation()
      );
    }
  }, [dropdownRef]);

  const dummyDomains = [
    "google.com",
    "yahoo.com",
    "bing.com",
    "facebook.com",
    "instagram.com",
    "youtube.com",
    "apple.com",
    "spotify.com",
    "twitter.com",
    "x.com",
    "fbi.gov",
    "cia.gov",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={domains === undefined}>Select domains</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-h-[320px] overflow-y-scroll"
        ref={dropdownRef}
      >
        <DropdownMenuItemAlternative>
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="domain-search">Search</label>
            <Input
              id="domain-search"
              placeholder="e.g. mailtuned.com"
              onChange={(e) => {
                e.preventDefault();
              }}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
            />
          </div>
        </DropdownMenuItemAlternative>
        <DropdownMenuItemAlternative className="space-x-4">
          <Checkbox id="select-all" />
          <label htmlFor="select-all" className="hover:cursor-pointer w-full">
            Select all
          </label>
        </DropdownMenuItemAlternative>
        <DropdownMenuSeparator />
        {dummyDomains.map((domain) => {
          return (
            <DropdownMenuItemAlternative key={domain} className="space-x-4">
              <Checkbox id={domain} />
              <label htmlFor={domain} className="hover:cursor-pointer w-full">
                {domain}
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
