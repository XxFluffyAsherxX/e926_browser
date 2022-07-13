// https://e621.net/posts?limit=1&tags=order:random+fox+gay+score:%3E100


function search() {
    const searchBox = document.getElementById("searchBox").value
    const rattingOption = document.getElementById("rattingOption").value
    const galerie = document.getElementById("galerie")
    const orderSelect = document.getElementById("orderSelect").value
    const minimumScore = document.getElementById("minimumScoreInput").value
    let query = `https://e621.net/posts.json?limit=72&tags=${searchBox}+rating%3A${rattingOption}`
    if (orderSelect == 1){query += `+order%3Arandom`}
    if (minimumScore != ""){query += `+score:%3E${minimumScore}`}
    console.log(query)
    const loadItem = async () => {
        const result = await fetch(query)
        const data = await result.json()
        console.log(data)
        galerie.innerHTML =""
        for (let i = 0; i < data.posts.length; i++) {
            const newItem = `<img src="${String(data.posts[i].preview.url)}" class="galerieItem" onclick="showPicture(${String(data.posts[i].id)})">`
            galerie.innerHTML += newItem;
        }
    }
    loadItem()
}

function showPicture(url) {
    
}