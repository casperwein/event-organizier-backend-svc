const express = require("express")
const router = express.Router()

const QRCodeController = require("../controller/QrCodeController")

router.get("/", QRCodeController.getDataQRCode)
router.get("/event/:event_id", QRCodeController.getDataQRCodeByEventId)
router.get("/peserta/:peserta_id/event/:event_id", QRCodeController.updateStatus)

module.exports = router