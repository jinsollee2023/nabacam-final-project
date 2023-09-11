// src/store/memberValuesStore.ts
import { create } from "zustand";

interface MemberValues {
  name: string;
  team: string;
  email: string;
  phone: string;
}

interface MemberValuesStore {
  values: MemberValues;
  setMamber: (newValues: MemberValues) => void;
}

const useMemberValuesStore = create<MemberValuesStore>((set) => ({
  values: {
    name: "",
    team: "",
    email: "",
    phone: "",
  },
  setMamber: (newValues: MemberValues) => set({ values: newValues }),
}));

export default useMemberValuesStore;
