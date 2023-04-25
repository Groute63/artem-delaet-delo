import { create } from "zustand";

interface ModalStore {
  interactEventModalId: string | null;
  setInteractEventModalId: (v: string | null) => void;
  isInteractEventModalVisible: boolean;
  openInteractEventModal: () => void;
  closeInteractEventModal: () => void;
  lastSelectedDate: Date | null;
  setLastSelectedDate: (v: Date) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  interactEventModalId: null,
  setInteractEventModalId: (v: string | null) =>
    set({ interactEventModalId: v }),
  isInteractEventModalVisible: false,
  openInteractEventModal: () => set({ isInteractEventModalVisible: true }),
  closeInteractEventModal: () => set({ isInteractEventModalVisible: false }),
  lastSelectedDate: null,
  //todo
  setLastSelectedDate: (v) => set({ lastSelectedDate: v }),
  /* setLastSelectedDate: (v) => {
    const nextDay = new Date(v);
    nextDay.setDate(nextDay.getDate() + 1);
    set({ lastSelectedDate: nextDay });
  },*/
}));
