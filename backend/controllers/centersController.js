const express = require("express");
const router = express.Router();
const db = require("../config/db");

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

exports.getAllCenters = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Centers");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getCenterById = async (req, res) => {
  const centerId = req.params.id;

  try {
    const [rows] = await db.query("SELECT * FROM Centers WHERE id = ?", [
      centerId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Center not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};
