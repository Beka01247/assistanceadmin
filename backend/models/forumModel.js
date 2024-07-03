const db = require("../config/db");

class Forum {
  constructor(user_id, title, description) {
    this.user_id = user_id;
    this.title = title;
    this.description = description;
  }

  async save() {
    let sql = `INSERT INTO forums(user_id, title, description) VALUES (${this.user_id}, '${this.title}', '${this.description}')`;
    const [newForum, _] = await db.execute(sql);
    return newForum;
  }

  static findAll() {
    let sql = "SELECT * FROM forums";
    return db.execute(sql);
  }

  static async findById(id) {
    let sql = `SELECT * FROM forums WHERE id = ?`;
    const [rows, _] = await db.execute(sql, [id]);
    return rows;
  }

  static async deleteById(id) {
    let sql = `DELETE FROM forums WHERE id = ?`; 
    const [results] = await db.execute(sql, [id]); 
    return results.affectedRows > 0;
  }
  
  
}


module.exports = Forum;
