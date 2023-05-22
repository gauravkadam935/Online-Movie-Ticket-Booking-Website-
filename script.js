// Intialize all variables
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



const mov = "/movie/";
const query2 = "?";
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
// here we call API
initialDetails(API_URL);
function initialDetails(url) {

  fetch(url).then((response) => {

    return response.json();

  }).then((res) => {
    showcase(res.results);

  })

};

// We’ll create a movie card for each movie with the name of the movie, an image of the movie, the language,
//  and the ratings.
let modal = document.querySelector(".mymodel");
function showcase(data) {
  // it is for clear main element content
  main.innerHTML = "";

  data.forEach(movie => {
    const { title, poster_path, vote_average, original_language, overview, duration } = movie;
    // here we creating movie card
    const movieEl = document.createElement('div');
    // adding class name
    movieEl.classList.add('card');
    // adding movie info(image,rating,language,title)
    movieEl.innerHTML = `
            
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
            
            `
    // here we adding event listner to movie element after clicking on movie card
    movieEl.addEventListener('click', () => {
      modal.style.display = "block";
      // here we are taking information of perticuler movie thats why we again fetch data form API
      let url = BASE_URL + mov + movie.id + query2 + API_KEY;
      fetch(url).then(response => response.json()).then(res => {
        console.log(res);
        addmodel(res);
      })
    })
    // appending movieEl div into main div
    main.appendChild(movieEl);
  });
};

// This is css property for rating
function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
};


// - Adding Search Functionality
// here is a event listner for form tag with preventDefault method
const search = document.getElementById("search");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // search.value is basically user input
  const searchTerm = search.value;
  // we adding a condition for if input data is similer to the API data then it will return or it will show normal 
  // order of movie
  if (searchTerm) {
    initialDetails(searchURL + '&query=' + searchTerm)
  } else {
    initialDetails(API_URL);
  }
});

// - Adding Genre List
// creating empty array for storing selected genre 
var selectGenre = [];
setGenre();
function setGenre() {
  const tagsEl = document.getElementsByClassName("tags");
  // clearing tag element if we are not clearing previous data then it will merged the old once.
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    // creating div
    const t = document.createElement('div');
    // adding class
    t.classList.add('tag');
    // storing genre id into t.id
    t.id = genre.id;
    // adding name
    t.innerText = genre.name;
    // adding event listner for genre
    t.addEventListener("click", () => {
       // here we give condition if selectGenre array is empty then only push genre.id
      if (selectGenre.length == 0) {
        selectGenre.push(genre.id);
        t.style.borderBottom = "thin solid white";
      } else {
        // here we check if we already push values into array with includes method
        if (selectGenre.includes(genre.id)) {
          // we are taking index of that genre for removing previously selected
          let idx = selectGenre.indexOf(genre.id);
          selectGenre.splice(idx, 1)
          t.style.borderBottom = "none";
        }
        // it is for we clicked another genre option it push related movies
        else {
          selectGenre.push(genre.id);
          t.style.borderBottom = "thin solid white";
        }
      }
      console.log(selectGenre);
      // here making api call to getting movies having selected genre
      initialDetails(API_URL + '&with_genres=' + encodeURI(selectGenre.join(",")));
    })
    tagsEl[0].appendChild(t);
  })

};

// Here is addmodel function for adding movie info.
function addmodel(res) {
  // genrating random prices betwwen 250 to 300
  const price = Math.floor(Math.random()*50)+250;
  // here is accessing mymodel div with id my
  const modeldiv = document.getElementById("my");
  // adding class
  modeldiv.classList.add('Active');
  // adding info
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

// here is event listner for (X) button
  const closeBtn = document.querySelector("#closeBtn");
  closeBtn.addEventListener("click", () => {
    modeldiv.classList.remove('Active');
  })

  // here is event listner for buy. 
  const buybtn = document.getElementById("buy");
  buybtn.addEventListener("click",()=>{
    localStorage.setItem("price",price);
    localStorage.setItem("title",res.title);
    location.replace("index2.html");

  })
};