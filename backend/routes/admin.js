const express = require("express");
const adminController = require("../controllers/adminController");
const forumController = require("../controllers/forumController");
const userController = require("../controllers/userController");
const centerController = require("../controllers/centersController");
const router = express.Router();
const verifyAdmin = require("../middlewares/adminMid");

// account
router.post("/login", adminController.adminLogin);
router.post("/change-info", verifyAdmin, adminController.changeAdminDetails);

// users control
router.get("/users", verifyAdmin, adminController.getAllUsers);
router.get("/users/:userId", verifyAdmin, adminController.getUserById);
router.get(
  "/users/:userId/forumMessages",
  verifyAdmin,
  adminController.getForumMessagesByUser
);
router.get(
  "/users/:userId/forums",
  verifyAdmin,
  adminController.getForumsByUser
);
router.get(
  "/users/:userId/incidents",
  verifyAdmin,
  adminController.getIncidentsByUser
);
router.get(
  "/users/:userId/natdis",
  verifyAdmin,
  adminController.getNaturalDisastersByUser
);
router.post("/study-centers/add", verifyAdmin, centerController.addCenter);
router.get("/study-centers", centerController.getAllCenters);
router.get("/study-centers/:id", centerController.getCenterById);
router.post("/users/:userId/ban", verifyAdmin, adminController.banUser);
router.get("/users/:userId/stats", verifyAdmin, adminController.getUserStats);

// content control

router.get("/forums", verifyAdmin, forumController.allForums);
router.get("/forums/:forum_id", verifyAdmin, forumController.forumById);
router.get(
  "/forums/:forumId/messages",
  verifyAdmin,
  forumController.allMessagesByForum
);
router.get("/messages", verifyAdmin, adminController.getAllMessages);

// natural disasters

router.post(
  "/disasters/add-disaster",
  verifyAdmin,
  userController.addNaturalDisaster
);
router.get("/disasters", verifyAdmin, userController.getAllNaturalDisasters);
router.get(
  "/disasters/:natDisId",
  verifyAdmin,
  userController.getNaturalDisasterById
);
router.get(
  "/disasters/:natDisId/messages",
  verifyAdmin,
  userController.getAllMessagesByNatDis
);

// support chat

router.post("/chats", verifyAdmin, adminController.createChat);
router.get("/chats", verifyAdmin, adminController.getChats);
router.post(
  "/chats/:chatId/messages",
  verifyAdmin,
  adminController.sendMessage
);
router.get(
  "/chats/:chatId/messages",
  verifyAdmin,
  adminController.getChatMessages
);

// incidents
router.get("/incidents", verifyAdmin, userController.getIncidents);
router.patch(
  "/incidents/:incident_Id/status",
  verifyAdmin,
  userController.updateIncidentStatus
);

router.get("/user/:user_id/certificate/", adminController.getCertificate);
module.exports = router;

// delete
router.delete("/forum/messages/:messageId", adminController.deleteForumMessage);
router.delete("/forum/:forumId", adminController.deleteForum);
router.delete(
  "/natural-disasters/:natDisId",
  adminController.deleteNaturalDisaster
);
router.delete("/study-centers/:centerId", adminController.deleteStudyCenter);

router.post("/send-notification", async (req, res) => {
  console.log("Received notification data:", req.body);

  if (!req.body.to || !req.body.body) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  res.send({ status: "Notification sent successfully" });
});
