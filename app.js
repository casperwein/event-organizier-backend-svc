const express = require('express')
const cors = require('cors')

const userService = require("./router/UserRouter")

const app = express()
const port = process.env.PORT 

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/user", userService)


app.listen(port, () => console.log(`event-organizer:${port}`))