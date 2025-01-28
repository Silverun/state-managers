import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { fetchUsers, toggleStatus } from "../../store/redux/slices/user";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error, statusUpdating } = useAppSelector(
    (state) => state.users
  );

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle toggling user status
  const handleToggleStatus = (userId: number) => {
    dispatch(toggleStatus(userId));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      {users.map((user) => (
        <View
          key={user.id}
          className="flex-row justify-between items-center p-4 mb-2 border-b border-gray-300"
        >
          <View>
            <Text className="text-lg font-bold">{user.name}</Text>
            <Text className="text-sm text-gray-600">{user.email}</Text>
          </View>
          {statusUpdating === user.id ? (
            // Show loading indicator while status is being updated
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            // Show status pill when not updating
            <TouchableOpacity
              onPress={() => handleToggleStatus(user.id)}
              className={`px-4 py-2 rounded ${
                user.status === "active" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                className={`font-bold ${
                  user.status === "active" ? "text-green-800" : "text-red-800"
                }`}
              >
                {user.status}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default UserList;
