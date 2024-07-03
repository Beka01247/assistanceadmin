const db = require("../config/db");

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }


  static async findByEmail(email) {
    let sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(sql, [email]);
    if (rows.length > 0) {
      return new User(rows[0].id, rows[0].email, rows[0].password);
    } else {
      return null; 
    }
  }

  static checkPassword(providedPassword, storedPassword) {
    return providedPassword === storedPassword;
  }

  static async findByIdAndForumId(messageId, forumId) {
    let sql = `SELECT * FROM messages WHERE id = ? AND forumId = ?`;
    const [rows] = await db.execute(sql, [messageId, forumId]);
    if (rows.length > 0) {
      return new Message(rows[0].id, rows[0].userId, rows[0].forumId, rows[0].content);
    } else {
      return null;
    }
  }

  static async deleteById(messageId) {
    let sql = `DELETE FROM messages WHERE id = ?`;
    return db.execute(sql, [messageId]);
  }

  static findAll() {
    let sql = "SELECT * FROM users";
    return db.execute(sql);
  }
}

module.exports = User;