"use client";

import { Button } from "../ui/button";

const spfPresets = [
  {
    label: "Google (Workspace)",
    data: "v=spf1 include:_spf.google.com ~all",
  },
  {
    label: "Microsoft (Outlook)",
    data: "v=spf1 include:spf.protection.outlook.com -all",
  },
  {
    label: "Namecheap (Privatemail)",
    data: "v=spf1 include:spf.privateemail.com ~all",
  },
  {
    label: "Zoho",
    data: "v=spf1 include:zoho.com -all",
  },
  {
    label: "Stackmail",
    data: "v=spf1 include:spf.stackmail.com -all",
  },
];

export default function SpfButtons() {
  return (
    <>
      {spfPresets.map((preset) => {
        return (
          <Button className="py-8" key={preset.label}>
            {preset.label}
          </Button>
        );
      })}
    </>
  );
}
