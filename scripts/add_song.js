addEventListener("DOMContentLoaded", function(){
    document.querySelector("#addBtn").addEventListener("click", addSong)
})

async function addSong(){
    const song = {
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,
        genre: document.querySelector("#genre").value ? document.querySelector("#genre").value.split(",") : [] // split up into an array
    }

    const response = await fetch("https://strong-angry-diver.glitch.me",{ 
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(song)
    })

    if(response.ok){
        const results = await response.json()
        // hidden param of _id
        alert("Added song with ID of" + results._id)

        //reset form
        document.querySelector("form").reset()
    }
    else{
        document.querySelector("#error").innerHtml = "Cannot Add Song"
    }
}