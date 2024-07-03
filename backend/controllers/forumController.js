const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.createForum = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const [result] = await db.query(
      "INSERT INTO Forums (title, description, user_id, created_at) VALUES (?, ?, ?, NOW())",
      [title, description, userId]
    );

    const [newForum] = await db.query(
      "SELECT * FROM Forums WHERE forum_id = ?",
      [result.insertId]
    );

    res.status(201).json({ message: newForum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.allForums = async (req, res) => {
  try {
    const query = `
      SELECT f.forum_id, f.title, f.description, f.user_id, f.created_at, u.name, u.surname
      FROM forums f
      JOIN users u ON f.user_id = u.user_id
    `;

    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching forums:", error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.forumById = async (req, res) => {
  const forumId = req.params.forum_id;
  try {
    const [rows] = await db.query(
      `
      SELECT 
        f.*,
        u.name,
        u.surname,
        u.type
      FROM 
        Forums f
        JOIN Users u ON f.user_id = u.user_id
      WHERE 
        f.forum_id = ?
    `,
      [forumId]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

// messages

exports.addMessage = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const forum_id = req.params.forumId;
    const { content } = req.body;

    if (!content || !forum_id) {
      return res
        .status(400)
        .json({ message: "Content and forum ID are required" });
    }

    const [insertResult] = await db.query(
      "INSERT INTO forum_messages (content, forum_id, user_id, created_at) VALUES (?, ?, ?, NOW())",
      [content, forum_id, userId]
    );

    const [newMessage] = await db.query(
      "SELECT * FROM forum_messages WHERE forum_message_id = ?",
      [insertResult.insertId]
    );

    res.status(201).json(newMessage[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.allMessagesByForum = async (req, res) => {
  const forumId = req.params.forumId;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        fm.forum_message_id,
        fm.content,
        fm.created_at AS message_created_at,
        u.name AS message_user_name,
        u.surname AS message_user_surname,
        u.type AS message_user_type
      FROM 
        forum_messages fm
        JOIN forums f ON fm.forum_id = f.forum_id
        JOIN users fu ON f.user_id = fu.user_id
        JOIN users u ON fm.user_id = u.user_id
      WHERE 
        fm.forum_id = ?
    `,
      [forumId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};
