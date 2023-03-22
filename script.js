const API_KEY = 'api_key=a3dbde4d3aff7b2f47bfa274384576c5';
const BASE_URL = 'https://api.themoviedb.org/3';
const query = '/movie/now_playing?';
const languageQuery = '&language=en-US';
const page = '&page=1';
const API_URL = BASE_URL + query + API_KEY + languageQuery + page;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;



const main = document.querySelector(".right-side");
const form = document.getElementById("form");
const search = document.getElementById("search");


const mov = "/movie/";
const query2 = "?";
const movieId = 315162;
const movieurl = BASE_URL + mov + movieId + query2 + API_KEY;


// https://api.themoviedb.org/3/movie/315162?api_key=a3dbde4d3aff7b2f47bfa274384576c5

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
];

initialDetails(API_URL);
function initialDetails(url) {

  fetch(url).then((response) => {

    return response.json();

  }).then((res) => {
    showcase(res.results);

  })

};


let modal = document.querySelector(".mymodel");
function showcase(data) {
  main.innerHTML = "";

  data.forEach(movie => {
    const { title, poster_path, vote_average, original_language, overview, duration } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
            <div class="card">
                <div class="image">
                    <img src="${IMG_URL + poster_path}" class="card-img-top" alt="${title}">
                </div>
                <div class="movie-info">
                    <div class="${getColor(vote_average)}">${vote_average}</div>
                    <div class="lang">${original_language.toUpperCase()}</div>
                </div>
                <div class="movie-title">
                    <h3 class="movie-name">${title}</h3>
                </div>
            </div>
            `
    movieEl.addEventListener('click', () => {
      modal.style.display = "block";
      let url = BASE_URL + mov + movie.id + query2 + API_KEY;
      fetch(url).then(response => response.json()).then(res => {
        console.log(res);
        addmodel(res);
      })



    })
    main.appendChild(movieEl);
  });
};

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
};


// search barr

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    initialDetails(searchURL + '&query=' + searchTerm)
  } else {
    initialDetails(API_URL);
  }
});

// setting the genre
var selectGenre = [];
setGenre();
function setGenre() {
  const tagsEl = document.getElementsByClassName("tags");
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectGenre.length == 0) {
        selectGenre.push(genre.id);
        t.style.borderBottom = "thin solid white";
      } else {
        if (selectGenre.includes(genre.id)) {
          selectGenre.forEach((id, idx) => {
            selectGenre.splice(idx, 1)

          })
          t.style.borderBottom = "none";
        }
        else {
          selectGenre.push(genre.id);
          t.style.borderBottom = "thin solid white";
        }
      }
      console.log(selectGenre);
      initialDetails(API_URL + '&with_genres=' + encodeURI(selectGenre.join(",")));
    })
    tagsEl[0].appendChild(t);
  })

};

function heighlightedTag() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight');
  })

  if (selectGenre != 0) {
    selectGenre.forEach(id => {
      const highlighting = document.getElementById(id);
      highlighting.classList.add('highlight');
    })
  }
};

function addmodel(res) {
  const price = Math.floor(Math.random()*50)+250;
  const modeldiv = document.getElementById("my");
  modeldiv.classList.add('Active');
  modeldiv.innerHTML = `
  <div class="model-header">
  <button class="btn" id="closeBtn">&times;</button>
  </div>
  <div class="content">
  <div class="image1">
      <img src="${IMG_URL + res.poster_path}" alt="${res.title}">
  </div>
  <div class="info">
      <h2 class="title">${res.title}</h2>
      <h4 class=${getColor(res.vote_average)}>${res.vote_average}/10</h4>
      <p class="duration">${res.runtime} Min<span class="language">${res.original_language.toUpperCase()}</span></p>
      <p class="description">${res.overview}</p>
      <p class="price">Price:- ${price}</p>
      
  </div>
  <div class="footer1"><button class="btn" id="buy">Buy</button></div>
  
</div>
` 

  const closeBtn = document.querySelector("#closeBtn");
  closeBtn.addEventListener("click", () => {
    modeldiv.classList.remove('Active');
  })

  const buybtn = document.getElementById("buy");
  buybtn.addEventListener("click",()=>{
    localStorage.setItem("price",price);
    localStorage.setItem("title",res.title);
    location.replace("index2.html");

  })
};