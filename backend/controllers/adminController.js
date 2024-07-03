const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.adminLogin = async (req, res) => {
  const { name, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM Users WHERE name = ?", [
      name,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: admin.user_id, isAdmin: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );

    res.status(200).json({
      token,
      user: {
        user_id: admin.user_id,
        type: admin.type,
        name: admin.name,
        surname: admin.surname,
        phone: admin.phone,
        email: admin.email,
        created_at: admin.created_at,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changeAdminDetails = async (req, res) => {
  const { oldPassword, newPassword, newName } = req.body;
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const [rows] = await db.execute("SELECT * FROM Users WHERE user_id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    let updateQuery = "UPDATE Users SET ";
    let updateParams = [];

    if (newPassword) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateQuery += "password = ?, ";
      updateParams.push(hashedNewPassword);
    }

    if (newName) {
      updateQuery += "name = ?, ";
      updateParams.push(newName);
    }

    updateQuery = updateQuery.slice(0, -2);
    updateQuery += " WHERE user_id = ?";
    updateParams.push(userId);

    await db.execute(updateQuery, updateParams);

    res.status(200).json({ message: "Details updated successfully" });
  } catch (error) {
    res.status500.json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT user_id, name, surname, phone, email, type, created_at, isBanned, certificate_pdf, photo FROM Users WHERE isAdmin != true"
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.execute("SELECT * FROM Users WHERE user_id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getForumMessagesByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const query = `
      SELECT 
        fm.forum_message_id,
        fm.content,
        fm.forum_id,
        fm.user_id,
        fm.created_at,
        u.name,
        u.surname
      FROM 
        forum_messages fm
      JOIN 
        users u ON fm.user_id = u.user_id
      WHERE 
        fm.user_id = ?
    `;
    const [rows] = await db.execute(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching forum messages:", error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getForumsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.execute("SELECT * FROM Forums WHERE user_id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No forums found for this user" });
    }

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIncidentsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM Incidents WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No incidents found for this user" });
    }

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNaturalDisastersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM NaturalDisasters WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No natural disasters found for this user" });
    }

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCenter = async (req, res) => {
  const {
    city,
    address,
    latitude,
    longitude,
    time_open,
    time_close,
    email,
    website_link,
    phone_number,
    whatsapp_link,
    telegram_link,
    instagram_link,
    type,
  } = req.body;

  if (
    !city ||
    !address ||
    !latitude ||
    !longitude ||
    !time_open ||
    !time_close ||
    !type
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await db.query(
      `INSERT INTO Centers (city, address, latitude, longitude, time_open, time_close, email, website_link, phone_number, whatsapp_link, telegram_link, instagram_link, type) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        city,
        address,
        latitude,
        longitude,
        time_open,
        time_close,
        email,
        website_link,
        phone_number,
        whatsapp_link,
        telegram_link,
        instagram_link,
        type,
      ]
    );
    res
      .status(201)
      .json({ message: "Center added", centerId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const query = `
      SELECT 
        fm.forum_message_id,
        fm.content,
        fm.forum_id,
        fm.user_id,
        fm.created_at,
        u.name,
        u.surname
      FROM 
        forum_messages fm
      JOIN 
        users u ON fm.user_id = u.user_id
    `;

    const [rows] = await db.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.banUser = async (req, res) => {
  const userId = req.params.userId;
  const { isBanned } = req.body;

  if (typeof isBanned !== "boolean") {
    return res.status(400).json({ message: "isBanned must be a boolean" });
  }

  try {
    const [result] = await db.execute(
      "UPDATE Users SET isBanned = ? WHERE user_id = ?",
      [isBanned, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User ban status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createChat = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;
  const adminId = req.body.adminId;

  try {
    const [result] = await db.execute(
      "INSERT INTO SupportChats (user_id, admin_id, created_at) VALUES (?, ?, NOW())",
      [userId, adminId]
    );

    res.status(201).json({ chatId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, "your_jwt_secret");
  const userId = decoded.userId;

  const chatId = req.params.chatId;
  const { message } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO SupportMessages (chat_id, sender_id, message, sent_at) VALUES (?, ?, ?, NOW())",
      [chatId, userId, message]
    );

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChatMessages = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM SupportMessages WHERE chat_id = ? ORDER BY sent_at ASC",
      [chatId]
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserStats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [forumMessagesCount] = await db.execute(
      "SELECT COUNT(*) as count FROM forum_messages WHERE user_id = ?",
      [userId]
    );
    const [forumsCount] = await db.execute(
      "SELECT COUNT(*) as count FROM Forums WHERE user_id = ?",
      [userId]
    );
    const [incidentsCount] = await db.execute(
      "SELECT COUNT(*) as count FROM incidents WHERE user_id = ?",
      [userId]
    );
    const [natDisMessagesCount] = await db.execute(
      "SELECT COUNT(*) as count FROM nat_dis_messages WHERE user_id = ?",
      [userId]
    );

    res.status(200).json({
      forumMessages: forumMessagesCount[0].count,
      forums: forumsCount[0].count,
      incidents: incidentsCount[0].count,
      natDisMessages: natDisMessagesCount[0].count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificate = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const [rows] = await db.query(
      `SELECT certificate_pdf FROM Users WHERE user_id = ?`,
      [userId]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no certificate available" });
    }
    res.setHeader("Content-Type", "application/pdf");
    res.send(rows[0].certificate_pdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getChats = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  try {
    const [rows] = await db.execute(
      `SELECT sc.chat_id, u.name as user_name, sc.last_message, sc.unread_messages
       FROM SupportChats sc
       JOIN Users u ON sc.user_id = u.user_id
       WHERE sc.admin_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No chats found" });
    }

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteForumMessage = async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const [result] = await db.execute(
      "DELETE FROM forum_messages WHERE forum_message_id = ?",
      [messageId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteForum = async (req, res) => {
  const forumId = req.params.forumId;

  try {
    // Delete associated messages
    await db.execute("DELETE FROM forum_messages WHERE forum_id = ?", [
      forumId,
    ]);

    // Delete the forum
    const [result] = await db.execute("DELETE FROM forums WHERE forum_id = ?", [
      forumId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json({ message: "Forum deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNaturalDisaster = async (req, res) => {
  const natDisId = req.params.natDisId;

  try {
    const [result] = await db.execute(
      "DELETE FROM NaturalDisasters WHERE nat_dis_id = ?",
      [natDisId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Natural disaster not found" });
    }

    res.status(200).json({ message: "Natural disaster deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudyCenter = async (req, res) => {
  const centerId = req.params.centerId;

  try {
    const [result] = await db.execute("DELETE FROM StudyCenters WHERE id = ?", [
      centerId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Study center not found" });
    }

    res.status(200).json({ message: "Study center deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
