const main_url = "https://api.jikan.moe/v3";


 async function Anime(action){

    action.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

        const res = await  fetch(`${main_url}/search/anime?q=${query}&page=1`)
        .then(res =>res.json())
        .then(update)

}

function update(data){

    const searchResults = document.getElementById('search-results');
    console.log(data)

    const animeByCategories = data.results
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {});

        searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

            const animesHTML = animeByCategories[key]
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <div class="card">
                        <div class="card-img">
                            <img src="${anime.image_url}">
                        </div>
                        <div class="card-body">

                            <h5 class="card-title">${anime.title}</h5>
                             <span class="badge badge-warning">IMDB ${anime.score}</span>
                            <span class="badge badge-primary">EP1-${anime.episodes}</span>
                            <p class="card-text">Type : ${key.toUpperCase()}</p>
                            <p class="card-text">Start-Date : ${anime.start_date}</p>
                            <p class="card-text">End-Date : ${anime.end_date}</p>
                            </div>
                            <div class = "card-footer">
                         <a href="${anime.url}" class="btn btn-primary btn-block url-btn ">Click to Watch</a>
                        
                    </div>
                `
            }).join("");


            return `
                <section>
                    <h3 class="type">${key.toUpperCase()}</h3>
                    <div class="con-row">${animesHTML}</div>
                </section>
            `
        }).join("  ");
}

function pageLoad(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", Anime);
}


window.addEventListener("load", pageLoad);

