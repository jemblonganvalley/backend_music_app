//PACKAGE
const express = require("express")
const cors = require("cors")
const path = require("path")
const album_route = require("./routes/album_route")
const song_route = require("./routes/song_route")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT

//MIDDLEWARE
app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: false }))


//ROUTES
app.use('/api', album_route)
app.use('/api', song_route)

//LISTENER
app.listen(PORT, () => { console.log(`listen port PORT`) })