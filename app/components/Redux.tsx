import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { addTodo, toggleTodo, deleteTodo } from "../store/redux/slices/todo";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";

export const Redux = () => {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Todo List</Text>
      <TextInput
        className="border rounded p-2 mb-4 "
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
            <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
              <Text
                className={`text-lg ${item.completed ? "line-through" : ""}`}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};
