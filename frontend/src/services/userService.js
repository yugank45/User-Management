const API_URL = "http://localhost:5000/api/users";

export const getUsers = async (search = "", status = "all") => {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (status !== "all") {
    params.append("status", status);
  }

  const response = await fetch(
    `${API_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  return data.users || data;
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
};

export const updateUserStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user status");
  }

  return response.json();
};