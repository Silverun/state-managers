import { create } from "zustand";
import { produce } from "immer";
import { User, toggleUserStatus, getAllUsers } from "../../api";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  statusUpdating: number | null;
  fetchUsers: () => Promise<void>;
  toggleStatus: (id: number) => Promise<void>;
}

const useUsersStore = create<UsersState>()((set) => ({
  users: [],
  loading: false,
  error: null,
  statusUpdating: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await getAllUsers();
      set({ users, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch users",
      });
    }
  },

  toggleStatus: async (id) => {
    set({ statusUpdating: id });
    try {
      const updatedUser = await toggleUserStatus(id);
      set(
        produce((state: UsersState) => {
          state.users = state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          state.statusUpdating = null;
        })
      );
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to toggle user status",
        statusUpdating: null,
      });
    }
  },
}));

export default useUsersStore;
