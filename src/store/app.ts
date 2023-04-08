import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
  token: string;
  setToken: (v: string) => void;
}

export const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      token: "",
      setToken: (v) => set({ token: v }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
