import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; // Import persist middleware
import { produce } from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) =>
        set(
          produce((state: TodoState) => {
            state.todos.push({ id: Date.now(), text, completed: false });
          })
        ),
      toggleTodo: (id) =>
        set(
          produce((state: TodoState) => {
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) todo.completed = !todo.completed;
          })
        ),
      deleteTodo: (id) =>
        set(
          produce((state: TodoState) => {
            state.todos = state.todos.filter((todo) => todo.id !== id);
          })
        ),
    }),
    {
      name: "todo-store", // The key for storing data in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage in Expo
    }
  )
);

export default useTodoStore;

// export const useBoundStore = create((...a) => ({
//   ...createBearSlice(...a),
//   ...createFishSlice(...a),
// }))
