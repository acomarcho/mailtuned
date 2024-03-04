import { atomWithStorage } from "jotai/utils";

type ApiKeyAtom = {
  key: string;
  secret: string;
};

export const apiKeyAtom = atomWithStorage<ApiKeyAtom | null>("apiKey", null);
