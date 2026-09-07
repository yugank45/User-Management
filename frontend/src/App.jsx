import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import SearchFilter from "./components/Searchfilter";
import {
  getUsers,
  updateUserStatus,
} from "./services/userService";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers(search, status);
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, status]);

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "active" ? "inactive" : "active";

      await updateUserStatus(id, newStatus);

      fetchUsers();

      if (selectedUser?.id === id) {
        setSelectedUser({
          ...selectedUser,
          status: newStatus,
        });
      }
    } catch (err) {
      setError("Failed to update user status");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>User Management</h1>
          <p>Manage users and their account status</p>
        </div>
      </header>

      <main className="container">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="empty">
            <h3>No users found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          <UserTable
            users={users}
            onView={setSelectedUser}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default App;