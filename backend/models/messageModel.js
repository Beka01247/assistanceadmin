const db = require("../config/db");

class Message {
  constructor(forum_id, user_id, content) {
    this.forum_id = forum_id;
    this.user_id = user_id;
    this.content = content;
  }

  async save() {
    let sql = `INSERT INTO messages (forum_id, user_id, content) VALUES (?, ?, ?)`;
    const [newMessage, _] = await db.execute(sql, [this.forum_id, this.user_id, this.content]);
    return newMessage;
  }

  static async findByForumId(forum_id) {
    let sql = `
        SELECT messages.id, messages.content, users.username
        FROM messages
        JOIN users ON messages.user_id = users.id
        WHERE messages.forum_id = ?
    `;
    const [rows, _] = await db.execute(sql, [forum_id]);
    return rows;
  }

  static async findById(messageId) {
    let sql = `SELECT * FROM messages WHERE id = ?`;
    const [rows, _] = await db.execute(sql, [messageId]);
    return rows.length > 0 ? rows[0] : null;
  }


  static async deleteById(messageId) {
    let sql = `DELETE FROM messages WHERE id = ?`;
    const [results] = await db.execute(sql, [messageId]);
    return results.affectedRows > 0;
  }
  
  static async deleteByForumId(forumId) {
    let sql = `DELETE FROM messages WHERE forum_id = ?`;
    await db.execute(sql, [forumId]);
  }

  
}

module.exports = Message;
