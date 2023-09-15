import { TRoom } from "src/components/chat/Room";
import { create } from "zustand";

type RoomStore = {
  roomName: string;
  setRoomName: (newRoomName: string) => void;

  selectedRoom: TRoom | null;
  setSelectedRoom: (room: TRoom | null) => void;

  createdRoomId: string;
  setCreatedRoomId: (roomId: string) => void;

  isFreelancerSender: boolean;
  setIsFreelancerSender: (value: boolean) => void;
  isClientSender: boolean;
  setIsClientSender: (value: boolean) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  roomName: "",
  setRoomName: (newRoomName: string) => set({ roomName: newRoomName }),

  selectedRoom: null,
  setSelectedRoom: (room: TRoom | null) => set({ selectedRoom: room }),

  createdRoomId: "",
  setCreatedRoomId: (roomId: string) => set({ createdRoomId: roomId }),

  isFreelancerSender: false,
  setIsFreelancerSender: (value: boolean) => set({ isFreelancerSender: value }),
  isClientSender: false,
  setIsClientSender: (value: boolean) => set({ isClientSender: value }),
}));
