const express = require("express")
const conn = require("../prisma/conn")
const song_route = express.Router()

// create song
song_route.post("/song/create", async (req, res) => {
    try {
        const {
            album_id,
            title,
            year,
            genre,
            performer,
            duration,
        } = await req.body

        const createSong = await conn.songs.create({
            data: {
                album_id: parseInt(album_id),
                title: title,
                year: year,
                genre: genre,
                performer: performer,
                duration: duration,
            }
        })

        res.status(201).json({
            success: true,
            query: createSong
        })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

// read songs





module.exports = song_route