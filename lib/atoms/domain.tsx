import { atomWithStorage } from "jotai/utils";

type DomainAtom = {
  domains: string[];
};

export const domainAtom = atomWithStorage<DomainAtom | undefined>(
  "domain",
  undefined
);
