import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
  token: string;
  setToken: (v: string) => void;
  login: string;
  setLogin: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
}

export const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      token: "",
      login: "",
      password: "",
      setToken: (v) => set({ token: v }),
      setLogin: (v) => set({ login: v }),
      setPassword: (v) => set({ password: v }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
