import { makeAutoObservable, reaction, runInAction } from "mobx";
import { User, toggleUserStatus, getAllUsers } from "../../api";

class UsersStore {
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;
  statusUpdating: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // Fetch users
  async fetchUsers() {
    this.loading = true;
    this.error = null;
    try {
      const users = await getAllUsers();
      runInAction(() => {
        this.users = users;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch users";
        this.loading = false;
      });
    }
  }

  // Toggle user status
  async toggleStatus(userId: number) {
    this.statusUpdating = userId;
    try {
      const updatedUser = await toggleUserStatus(userId);
      runInAction(() => {
        this.users = this.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        this.statusUpdating = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error
            ? error.message
            : "Failed to toggle user status";
        this.statusUpdating = null;
      });
    }
  }
}

// Export a singleton instance of the store
const usersStore = new UsersStore();

// reaction
const disposer = reaction(
  () => usersStore.users,
  (users, prev, reaction) => {
    const anyBlocked = users.some((user) => user.status === "blocked");
    if (anyBlocked) {
      console.log(
        "At least one user is blocked. Blocked users: " +
          users.filter((user) => user.status === "blocked").length
      );
      return;
    }
    reaction.dispose();
  }
);

export default usersStore;
