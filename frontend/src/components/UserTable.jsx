import StatusBadge from "./StatusBadge";

function UserTable({
  users,
  onView,
  onStatusChange,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.phone || "N/A"}</td>

              <td>{user.role}</td>

              <td>
                <StatusBadge status={user.status} />
              </td>

              <td>
                <div className="actions">
                  <button
                    className="view-btn"
                    onClick={() => onView(user)}
                  >
                    View
                  </button>

                  <button
                    className={
                      user.status === "active"
                        ? "deactivate-btn"
                        : "activate-btn"
                    }
                    onClick={() =>
                      onStatusChange(user.id, user.status)
                    }
                  >
                    {user.status === "active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;