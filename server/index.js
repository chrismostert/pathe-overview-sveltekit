const express = require("express")
const cors = require("cors")
const movieService = require("./movieService")
const NodeCache = require("node-cache")
const app = express()
app.use(cors())
const port = 3000

module.cache = new NodeCache();

app.get('/movies', async (req, res) => {
    const cinemaId = req.query.cinema

    if (cinemaId === undefined) {
        res.status(400).json("You must specify a cinema id!")
        return
    }

    try {
        let result = await movieService.getAllMovieInfo(cinemaId)
        // Cache for two hours
        res.set('Cache-control', 'public, max-age=7200')
        res.json(result)
    } catch {
        res.status(500).json("Something went wrong!")
    }
})

app.get('/cinemas', async (req, res) => {
    try {
        let result = await movieService.getCinemas()
        // Cache for 10 days
        res.set('Cache-control', 'public, max-age=36000')
        res.json(result)
    } catch (e) {
        res.status(500).json(`Error fetching cinemas: ${e}`)
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;