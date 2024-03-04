import { atomWithStorage } from "jotai/utils";

type ApiKeyAtom = {
  apiKey: string;
};

export const apiKeyAtom = atomWithStorage<ApiKeyAtom | null>("apiKey", null);
