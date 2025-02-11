const express = require("express");
var cors = require("cors")
//activate or tell this app variable to be an express server

const app = express()
// we have to use cors in order to host a front end and backend on the same device
app.use(cors())
const router = express.Router()


//listening function
app.listen(3000, function() {
    console.log("Listening on port 3000");
})

// all requests that usually use an api start with /api... the url would be api/songs
app.use("/api", router)
 
//making an api using routes
//routes are used to handle browser request
router.get("/songs", function(req, res) {
    const song = [{
        title: "Uptown Funk",
        artist: "Bruno Mars",
        popularity: 10,
        releaseDate: new Date(2021, 9, 20),
        genre: ["funk", "boogie"]
    }, {
        title: "Valentine",
        artist: "Laufey",
        popularity: 9,
        releaseDate: new Date(2021, 9, 20),
        genre: ["jazz", "pop"]
    }, {
        title: "Magnolia",
        artist: "Playboy Carti",
        popularity: 11,
        releaseDate: new Date(2021, 9, 20),
        genre: ["rap", "vampire"]
    }]
    res.json(song)
})

