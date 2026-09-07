function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${status}`}>
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}

export default StatusBadge;