const express = require("express")
const conn = require("../prisma/conn")
const album_route = express.Router()

// create album
album_route.post("/album/create", async (req, res) => {
    try {
        const data = await req.body
        // insert into albums(name, year) values($1,$2)

        const crateAlbum = await conn.albums.create({
            data: {
                name: data.name,
                year: parseInt(data.year)
            }
        })

        res.status(201).json({
            success: true,
            query: crateAlbum
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// read all
album_route.get('/albums/read', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        const skip = (page - 1) * limit
        const getData = await conn.albums.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            include: {
                _count: {
                    select: {
                        songs: true
                    }
                }
            }
        })
        const countData = await conn.albums.count()

        res.status(200).json({
            success: true,
            current_page: parseInt(page),
            total_page: Math.ceil(countData / limit),
            total_data: countData,
            query: getData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// find
album_route.post("/album/find", async (req, res) => {
    try {
        const { filter } = await req.body
        const findAlbum = await conn.albums.findUnique({
            where: filter,
            include: {
                songs: true
            }
        })
        res.status(200).json({
            success: true,
            query: findAlbum
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

module.exports = album_route