const express = require('express')
const cors = require('cors')
const path = require('path');


const userService = require("./router/UserRouter")
const eventService = require("./router/EventRouter")
const pesertaService = require("./router/PesertaRouter")
const qrcodeService = require("./router/QrCodeRouter")

const app = express()
const port = process.env.PORT 

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use("/user", userService)
app.use("/event", eventService)
app.use("/peserta", pesertaService)
app.use("/qrcode", qrcodeService)


app.listen(port, () => console.log(`event-organizer:${port}`))