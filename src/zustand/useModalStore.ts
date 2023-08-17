import { create } from "zustand";

type ModalStore = {
  addTaskModalOn: boolean;
  changeAddTaskModalstatus: () => void;
};

export const useModalStore = create<ModalStore>()((set) => ({
  addTaskModalOn: false,
  changeAddTaskModalstatus: () =>
    set((state) => ({ addTaskModalOn: !state.addTaskModalOn })),
}));

// const persistStore = persist<UserStore>(store, {
//     name: StorageKey,
//   });
//   export const useUserStore = create(devtools(persistStore));
