//listener that will trigger with the DOM being loaded

addEventListener("DOMContentLoaded", async function(){
    const response = await fetch("https://strong-angry-diver.glitch.me");
    const songs = await response.json();
    
    let html = "";
    for (let song of songs){
        let songID = song._id
        html+=`<li>${song.title} - ${song.artist} - <a href="details.html?id=${songID}">Details</a> - <a href="edit.html?id=${songID}">Edit Song</a></li>`;
    }
    
    document.querySelector("#list_of_songs").innerHTML = html;
})