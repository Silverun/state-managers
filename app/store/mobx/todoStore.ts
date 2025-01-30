import { makeAutoObservable } from "mobx";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(text: string) {
    this.todos.push({
      id: Date.now(),
      text,
      completed: false,
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

// Create a single instance of the store
const todoStore = new TodoStore();
export default todoStore;
