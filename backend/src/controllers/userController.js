import pool from "../db.js";

// GET /api/users
// Get all users with optional search and status filter
export const getUsers = async (req, res) => {
  try {
    const { search = "", status = "all" } = req.query;

    let query = `
      SELECT
        id,
        name,
        email,
        phone,
        role,
        status,
        created_at
      FROM users1
      WHERE 1=1
    `;

    const values = [];

    // Search by name or email
    if (search.trim()) {
      values.push(`%${search.trim()}%`);
      query += `
        AND (
          name ILIKE $${values.length}
          OR email ILIKE $${values.length}
        )
      `;
    }

    // Filter by status
    if (status !== "all") {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      users: result.rows,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Database error while fetching users",
    });
  }
};


// GET /api/users/:id
// Get a single user
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        phone,
        role,
        status,
        created_at
      FROM users1
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      success: false,
      message: "Database error while fetching user",
    });
  }
};


// PATCH /api/users/:id/status
// Activate / Deactivate a user
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Validate status
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either active or inactive",
      });
    }

    const result = await pool.query(
      `
      UPDATE users1
      SET status = $1
      WHERE id = $2
      RETURNING
        id,
        name,
        email,
        phone,
        role,
        status,
        created_at
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${status === "active" ? "activated" : "deactivated"} successfully`,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update user status error:", error);

    res.status(500).json({
      success: false,
      message: "Database error while updating user status",
    });
  }
};