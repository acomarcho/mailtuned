import { atomWithStorage } from "jotai/utils";

type DomainAtom = {
  domains: string[];
  selectedDomains: string[];
};

export const domainAtom = atomWithStorage<DomainAtom | undefined>(
  "domain",
  undefined
);
