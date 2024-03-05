import { atomWithStorage } from "jotai/utils";

type DomainAtom = string;

export const domainAtom = atomWithStorage<DomainAtom | undefined>(
  "domain",
  undefined
);
