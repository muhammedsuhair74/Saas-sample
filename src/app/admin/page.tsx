"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/admin/users");
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await fetch("/api/admin/users", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    fetchUsers();
  };

  const handleCreateUser = async () => {
    const email = prompt("Enter user email:");
    const name = prompt("Enter user name:");
    const plan = prompt("Enter user plan (basic/pro):");

    if (email && name && plan) {
      await fetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({ email, name, plan }),
        headers: { "Content-Type": "application/json" },
      });
      fetchUsers();
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>

      <button
        onClick={handleCreateUser}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Create User
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Plan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.plan}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
