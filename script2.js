const selectMovieName = document.querySelector(".mov-title");
    const selectMoviePrice = document.querySelector(".tickit");
    const moviePrice = document.querySelector(".tickit");
    let noOfTickets = document.querySelector("#input").value;
    const convinienceFee = document.querySelector(".convinience-price");
    const totalFee = document.querySelector(".total-fee");

// adding event listner 
window.addEventListener("load",()=>{
    addinfo(localStorage.getItem("price"),localStorage.getItem("title"));
    let tickets = document.querySelector("#input");
    tickets.addEventListener('input', function (evt) {
        console.log("input change");
        addinfo(localStorage.getItem("price"),localStorage.getItem("title"),evt.currentTarget.value);
    });

})
function addinfo(price,title,noOfTickets=1){
    
    price = Number(price);
    noOfTickets = Number(noOfTickets);
    let basePrice = price*noOfTickets;
    convinienceFee.innerHTML = `RS ${(0.0175*basePrice).toFixed(2)}`;
    totalFee.innerHTML = `${(1.0175*basePrice).toFixed(2)}`;
    selectMovieName.innerHTML = `${title}`;
    moviePrice.innerHTML = `${price}`;  
    
    
  };

