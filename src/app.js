// https://e621.net/posts?limit=1&tags=order:random+fox+gay+score:%3E100

function HideNSFW() {
    const ratingDiv = document.getElementById("ratingDiv")
    const ratingSelect = document.getElementById("rattingOption")
    ratingSelect.value = "s"
    ratingDiv.classList.add("dspNONE")
}

function ShowNSFW() {
    const ratingDiv = document.getElementById("ratingDiv")
    const ratingSelect = document.getElementById("rattingOption")
    ratingDiv.classList.remove("dspNONE")
    ratingSelect.value = "0"
}

var page = 1
function search(arg) {
    const searchBox = document.getElementById("searchBox").value
    const rattingOption = document.getElementById("rattingOption").value
    const galerie = document.getElementById("galerie")
    const orderSelect = document.getElementById("orderSelect").value
    const minimumScore = document.getElementById("minimumScoreInput").value
    let query = `https://e621.net/posts.json?tags=${searchBox}`
    if (rattingOption != 0){query += `+rating%3A${rattingOption}`}
    if (orderSelect == 1){query += `+order%3Arandom`}
    if (minimumScore != ""){query += `+score:%3E${minimumScore}`}
    if (arg){
        if (arg == 1){
            page += 1
        }else if (arg == -1){
            if(page > 1){
                page -= 1
            }else{
                return
            }
        }
        query += `&page=${page}`
    }else{
        page = 1
    }
    

    console.log(query)
    const loadItem = async () => {
        const result = await fetch(query)
        const data = await result.json()
        console.log(data)
        galerie.innerHTML =""
        for (let i = 0; i < data.posts.length; i++) {
            let rating = ""
            switch(data.posts[i].rating){
                case "s" :
                    rating = "safe"
                break; case "q":
                    rating = "mature"
                break; case "e":
                    rating = "adult"
                break;
            }
            const newItem = `<a href="#top"><img src="${String(data.posts[i].preview.url)}" class="galerieItem ${rating}" onclick="showPicture(${String(data.posts[i].id)})"></a>`
            galerie.innerHTML += newItem;
        }
    }
    loadItem()
}

function showPicture(ID) {
    const modalContent = document.getElementById("modalContent")
    const loadItem = async ()=>  {
        const result = await fetch(`https://e621.net/posts/${ID}.json`)
        const data = await result.json()
        console.log(data)
        let base = `<img src="${data.post.file.url}" id="modalImg">
        <p><span class="green">↑${data.post.score.up}</span> <span class="red">↓${data.post.score.down}</span> | Favorites: ${data.post.fav_count} | ID: ${ID} | Rating: ${data.post.rating}<br><a href="${data.post.file.url}" id="downloadPost">Download</a> | <a href="https://e621.net/posts/${ID}" id="viewOnE6">View on e621.net</a></p>`
        modalContent.innerHTML = base
        const modal = document.getElementById("modal")
        modal.classList.add("active")
    }
    loadItem()
}

function CloseModal() {
    const modal = document.getElementById("modal")
    modal.classList.remove("active")
}