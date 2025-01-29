import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useTodoStore from "../../store/zustand/todoStore";
import UserList from "./UsersList";

export const Zustand = () => {
  const [text, setText] = useState("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Todo List</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Add a new todo"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-2 border-b">
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Text
                className={`text-lg ${item.completed ? "line-through" : ""}`}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
      />
      <View className="h-20" />
      <UserList />
    </View>
  );
};
