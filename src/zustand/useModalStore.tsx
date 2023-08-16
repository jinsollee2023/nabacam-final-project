// import { create } from "zustand";

// type ModalStore = {
//   addTaskModalVisible: boolean;
//   changeAddTaskModalstatus: () => void;
// };

// export const useModalStore = create<ModalStore>()((set) => ({
//   addTaskModalVisible: false,
//   changeAddTaskModalstatus: () =>
//     set((state) => ({ addTaskModalVisible: !state.addTaskModalVisible })),
// }));

// const persistStore = persist<UserStore>(store, {
//     name: StorageKey,
//   });
//   export const useUserStore = create(devtools(persistStore));

import React from "react";

const useModalStore = () => {
  return <div>useModalStore</div>;
};

export default useModalStore;
