addEventListener("DOMContentLoaded", async function(){
    document.querySelector("#updateBtn").addEventListener("click", updateSong)
    const urlparam = new URLSearchParams(window.location.search)
    const songId = urlparam.get('id')

    // get request for single song
    const response = await fetch("https://strong-angry-diver.glitch.me" + songId)
    if(response.ok){
        let song =  await response.json()
        document.querySelector("#songId").value = song._id
        document.querySelector("#title").value = song.title
        document.querySelector("#artist").value = song.artist
        document.querySelector("#released").value = song.releaseDate.substring(0,10)
        document.querySelector("#popularity").value = song.popularity
        document.querySelector("#genre").value = song.genre
    }  
})

async function updateSong(){
    const songID = document.querySelector("#songId").value

    const song = {
        _id: document.querySelector("#songId").value,
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,
        genre: document.querySelector("#genre").value ? document.querySelector("#genre").value.split(",") : []
    }

    const response = await fetch("https://strong-angry-diver.glitch.me" + songID, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(song)

    })

    if(response.ok){
        alert("Updated Song")
    }
    else{
        document.querySelector("#error").innerHTML = "Cannot Update Song"
    }
}