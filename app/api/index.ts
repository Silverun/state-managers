export const BASE_URL = "http://localhost:3000";

export interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "blocked";
}

const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithDelay = async (
  url: string,
  options?: RequestInit,
  delay = 1000
) => {
  await simulateDelay(delay); // Simulate a delay (e.g., 1 second)
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getAllUsers = async () => {
  const users = await fetchWithDelay(`${BASE_URL}/users`);
  return users as User[];
};

export const toggleUserStatus = async (userId: number): Promise<User> => {
  // Fetch the current user data
  const user: User = await fetchWithDelay(
    `http://localhost:3000/users/${userId}`
  );

  // Toggle the status
  const newStatus = user.status === "active" ? "blocked" : "active";

  // Update the user on the server
  const updatedUser = await fetchWithDelay(
    `http://localhost:3000/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    }
  );

  return updatedUser as User;
};
