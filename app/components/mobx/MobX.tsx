import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react-lite";
import todoStore from "../../store/mobx/todoStore"; // Import the MobX store
import UserList from "./UserList";

export const MobX = observer(() => {
  const [text, setText] = useState<string>("");

  const handleAddTodo = () => {
    if (text.trim()) {
      todoStore.addTodo(text);
      setText("");
    }
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Todo List (MobX)</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Add a new todo"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todoStore.todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-2 border-b">
            <TouchableOpacity onPress={() => todoStore.toggleTodo(item.id)}>
              <Text
                className={`text-lg ${item.completed ? "line-through" : ""}`}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              onPress={() => todoStore.deleteTodo(item.id)}
            />
          </View>
        )}
      />
      <View className="h-20" />
      <UserList />
    </View>
  );
});
