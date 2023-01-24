import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";

export const userAtom = atom({
  username: "",
  firstname: "",
  lastname: "",
});

export function useGetUser() {
  return useAtomValue(userAtom);
}

export function useSetUser() {
  return useSetAtom(userAtom);
}
