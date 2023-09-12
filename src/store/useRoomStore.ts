import { create } from "zustand";

type RoomStore = {
  roomName: string;
  setRoomName: (newRoomName: string) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  roomName: "",
  setRoomName: (newRoomName: string) => set({ roomName: newRoomName }),
}));
