const express = require("express")
const router = express.Router()
const multer = require('multer');

const EventController = require("../controller/EventController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/eventdescfile/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });
  
router.post("/", upload.single("eventpathfiledesc"), EventController.createEvent)
router.get("/", EventController.getAllEvent)
router.get("/:id", EventController.getEventById)
router.put("/:id", EventController.updateEvent)
router.delete("/:id", EventController.deleteEvent)
router.get("/:eventId/detail", EventController.detailEvent)


module.exports = router