const express = require("express")
const router = express.Router()

const PesertaController = require("../controller/PesertaController")

router.post("/", PesertaController.createPeserta)
router.get("/", PesertaController.getAllPeserta)
router.get("/:event_id", PesertaController.getPesertaByEventId)

module.exports = router