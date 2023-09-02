const express = require('express')
const cors = require('cors')

const userService = require("./router/UserRouter")
const eventService = require("./router/EventRouter")

const app = express()
const port = process.env.PORT 

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/user", userService)
app.use("/event", eventService)


app.listen(port, () => console.log(`event-organizer:${port}`))