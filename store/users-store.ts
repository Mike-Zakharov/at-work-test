import { create } from "zustand";

type UserStatus = "active" | "archive" | "hidden";

type UsersState = {
  statuses: Record<number, UserStatus>; // id -> status
  setStatus: (id: number, status: UserStatus) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
  statuses: {},
  setStatus: (id, status) =>
    set((state) => ({
      statuses: { ...state.statuses, [id]: status },
    })),
}));
