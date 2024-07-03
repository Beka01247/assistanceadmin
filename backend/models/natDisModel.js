const db = require("../config/db");

class NaturalDisaster {
  constructor (name, description, date_occurred) {
    this.name = name;
    this.description = description;
    this.date_occurred = date_occurred;
  }

  async save() {
    let sql = `INSERT INTO natural_disasters(name, description, date_occurred) VALUES ('${this.name}', '${this.description}', '${this.date_occurred}')`;
    const [newDisaster, _] = await db.execute(sql);
    return newDisaster;
  }


  static findAll() {
    let sql = "SELECT * FROM natural_disasters";
    return db.execute(sql);
  }
}

module.exports = NaturalDisaster;