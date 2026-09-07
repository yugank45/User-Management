import StatusBadge from "./StatusBadge";

function UserModal({
  user,
  onClose,
  onStatusChange,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>User Details</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="user-details">
          <div className="detail">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="detail">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="detail">
            <span>Phone</span>
            <strong>{user.phone || "N/A"}</strong>
          </div>

          <div className="detail">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>

          <div className="detail">
            <span>Status</span>
            <StatusBadge status={user.status} />
          </div>

          <div className="detail">
            <span>Created Date</span>
            <strong>
              {new Date(user.created_at).toLocaleDateString()}
            </strong>
          </div>
        </div>

        <div className="modal-footer">
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
              ? "Deactivate User"
              : "Activate User"}
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserModal;