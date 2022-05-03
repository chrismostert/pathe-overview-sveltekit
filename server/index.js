const express = require("express")
const cors = require("cors")
const movieService = require("./movieService")
const NodeCache = require("node-cache")
const app = express()
app.use(cors())
const port = 3000

module.cache = new NodeCache({ stdTTL: 7200 });

app.get('/movies', async (req, res) => {
    const cinemaId = req.query.cinema

    if (cinemaId === undefined) {
        res.status(400).json("You must specify a cinema id!")
        return
    }

    try {
        let result = await movieService(cinemaId)
        res.json(result)
    } catch {
        res.status(500).json("Something went wrong!")
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;