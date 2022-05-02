const cheerio = require("cheerio")
const axios = require("axios")
const Levenshtein = require("fast-levenshtein")

module.exports = getAllMovieInfo

async function getAllMovieInfo(cinemaId) {
    let cacheKey = `getAllMovieInfo_${cinemaId}`
    let cached = module.parent.cache.get(cacheKey)
    if (cached == undefined) {
        const mainLink = "https://www.pathe.nl/films/actueel?page="
        const movieBase = "https://www.pathe.nl"

        let pageNum = 1
        let movies = []

        while (true) {
            const html = await axios.get(mainLink + pageNum).then(res => res.data)
            const $ = cheerio.load(html)
            let posters = $('.poster')

            if (posters.length == 0) break

            posters.each((_, elem) => {
                movies.push(getMovieInfo(movieBase + elem.attribs['href'], cinemaId))
            })

            pageNum += 1
        }

        let result = await Promise.all(movies)
        module.parent.cache.set(cacheKey, result)
        return result
    }
    return cached
}

async function getMovieInfo(link, cinemaId) {

    let timeslink = link.match(/(https:\/\/www.pathe.nl\/film\/\d+)/)[0] + '/agenda?cinemas=' + cinemaId

    // Load basic movie info
    let html_info = axios.get(link).then(res => res.data)
    let html_times = axios.get(timeslink).then(res => res.data)

    let $ = cheerio.load(await html_info)

    // Info to return
    let titleVisual = $('.visual-movie__title-name').text()
    let title = titleVisual.replace(/\ \(.*\)/, "")
    title = title.slice(0, -1)
    let patheID = link.match(/\/(\d+)\//)[1]
    let year = $('.movie-intro__release').text().replace('Release: ', '')
    year = year.match(/\d+-\d+-(\d+)/)[1]

    let description = $("span[itemprop = 'description'] p").text().replace(" Lees meer", "").trim()

    let poster = $('.visual-movie__poster img').attr('src')
    let dateTimes = []

    // Can now start fetching RT data
    let rtData = getRT(title, year)

    $ = cheerio.load(await html_times)

    $('.schedule__section').each((_, day) => {
        let daytext = $(day).find(".schedule__day").text()
        let dateTime = {
            day: daytext,
            times: []
        }

        let times = $(day).find(".schedule-time__content")
        times.each((_, time) => {
            let start = $(time).find(".schedule-time__start").text()
            let end = $(time).find(".schedule-time__end").text()
            let label = $(time).find(".schedule-time__label").text().trim()

            dateTime.times.push({
                start: start,
                end: end,
                label: label
            })
        })

        dateTimes.push(dateTime)
    })

    return {
        titleVisual,
        title,
        patheID,
        year,
        description,
        poster,
        dateTimes,
        rtData: await rtData
    }
}

async function getRT(title, year) {
    const RT_LINK = "https://79frdp12pn-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.0)%3B%20Browser%20(lite)&x-algolia-api-key=175588f6e5f8319b27702e4cc4013561&x-algolia-application-id=79FRDP12PN"

    let getScore = hit => {
        return Levenshtein.get(hit.title, title) + 0.1 * Math.abs(parseInt(hit.releaseYear) - parseInt(year))
    }

    let content = {
        "requests": [
            {
                "indexName": "content_rt",
                "query": title,
                "params": "filters=rtId%20%3E%200%20AND%20isEmsSearchable%20%3D%201&hitsPerPage=5"
            }]
    }

    let result = await axios.post(RT_LINK, content).then(res => res.data)
    let hits = result.results[0].hits

    let bestScore = Infinity
    let best = null

    for (hit of hits) {
        score = getScore(hit)
        if (score < bestScore) {
            bestScore = score
            best = hit
        }
    }

    if (Levenshtein.get(best.title, title) < 5) {
        return {
            id: best.rtId,
            title: best.title,
            vanity: best.vanity,
            description: best.description,
            releaseYear: best.releaseYear,
            genres: best.genres,
            runTime: best.runTime,
            scores: best.rottenTomatoes
        }
    }
}