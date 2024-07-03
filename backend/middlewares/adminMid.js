const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Adjust the path as necessary

const verifyAdmin = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const [rows] = await db.execute(
      "SELECT isAdmin FROM Users WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;
