const db = require("../config/db");

class StudyCenter {
    constructor(id, name, location, disaster_id) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.disaster_id = disaster_id;
    }

    static async findAll() {
        let sql = "SELECT * FROM study_centers";
        return db.execute(sql);
    }
}

module.exports = StudyCenter;
