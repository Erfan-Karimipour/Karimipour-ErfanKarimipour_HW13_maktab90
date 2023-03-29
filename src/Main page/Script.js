`use strict`

const body=document.querySelector(`body`);
const searcher=document.querySelector(`.searcher`);
const UserName=document.getElementById(`logoutName`);
const form=document.querySelector(`.Form`);
const cityName=document.getElementById(`cityName`);
const countryName=document.getElementById(`countryName`);
const weatherStatus=document.getElementById(`weatherStatus`);
const weatherTemp=document.getElementById(`weatherTemp`);
const weatherTempDay=document.getElementById(`weatherTempDay`);
const weatherTempNight=document.getElementById(`weatherTempNight`);
const suggerstionBar=document.getElementById(`suggestionBar`);
const clearHistor=document.querySelector(`.ClearHistory`);
const todayImg=document.getElementById(`todayImg`);
const Theme=document.querySelector(`.Theme`);

let currentUser=JSON.parse( localStorage.getItem(`CurrentUser`) );

let OldSearches=JSON.parse(localStorage.getItem(`Old Searches`))||[];

let currentWearherStatus;

function LoggedOut(){
    localStorage.setItem(`LoggedIn`,`False`);
}

if (localStorage.getItem(`LoggedIn`)==`False`||!localStorage.getItem(`LoggedIn`)){

  window.open(`../Login page/Index.html`,`_self`);

}

function Fetcher(searcher) {
    
    if ( searcher.value!=undefined ){
      searcher = searcher.value;
    } else {
      searcher = searcher.innerHTML;
    }

    let lat;
    let lon;
    let weatherToday;

    console.log(`im eating shit`);

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ searcher}&appid=7efd43c8b96dfb3440b8b889283f96f5`)
    .then(res => res.json()).then((data) => {
        lat=data[0].lat ; lon=data[0].lon;
        return (fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7efd43c8b96dfb3440b8b889283f96f5`))
    })
    .then(ress => ress.json()).then((dataa)=>{
        
        weatherToday=dataa;

        if(  OldSearches==null || OldSearches.length==0 ){
            OldSearches.push(searcher);
            localStorage.setItem(`Old Searches`, JSON.stringify(OldSearches));
        } else if (OldSearches.length < 6) {
            OldSearches.push(searcher);
            localStorage.setItem(`Old Searches`, JSON.stringify(OldSearches));
        } else {
            OldSearches.push(searcher);
            OldSearches.shift(searcher);
            localStorage.setItem(`Old Searches`, JSON.stringify(OldSearches));
        }

        cityName.innerHTML = weatherToday.name;
        countryName.innerHTML = weatherToday.sys.country;
        weatherStatus.innerHTML = weatherToday.weather[0].description;
        weatherTemp.innerHTML = weatherToday.main.temp;
        weatherTempDay.innerHTML = weatherToday.main.temp_max;
        weatherTempNight.innerHTML = weatherToday.main.temp_min;

        currentWearherStatus = weatherToday.weather[0].main;

        switch (currentWearherStatus) {
          case `Clear`: todayImg.setAttribute(`src`,`../../Images/Gifs/Sun.gif`); break;
          case `Clouds`: todayImg.setAttribute(`src`,`../../Images/Gifs/Cloud.gif`); break;
          case `Rain`: todayImg.setAttribute(`src`,`../../Images/Gifs/Rain.gif`); break;
          case `Snow`: todayImg.setAttribute(`src`,`../../Images/Gifs/Snow.gif`); break;
        };

        form.classList.remove(`hidden`);

        Backgrounder(currentWearherStatus);

        oldSearchBarMaker();

        console.log(weatherToday.weather[0].main);

    })
}

function Backgrounder(){

  if (body.classList.contains(`dark`)){
    switch (currentWearherStatus) {
      case `Clear`: body.style.backgroundImage = `url("../../Images/Light/Sun.jpg")`; break;
      case `Clouds`: body.style.backgroundImage = `url("../../Images/Light/Cloud.jpg")`; break;
      case `Rain`: body.style.backgroundImage = `url("../../Images/Light/Rain.jpg")`; break;
      case `Snow`: body.style.backgroundImage = `url("../../Images/Light/Snow.jpg")`; break;
  }} else {
      switch (currentWearherStatus) {
        case `Clear`: body.style.backgroundImage = `url("../../Images/Dark/Sun.jpg")`; break;
        case `Clouds`: body.style.backgroundImage = `url("../../Images/Dark/Cloud.jpg")`; break;
        case `Rain`: body.style.backgroundImage = `url("../../Images/Dark/Rain.jpg")`; break;
        case `Snow`: body.style.backgroundImage = `url("../../Images/Dark/Snow.jpg")`; break;
      };
  };}

function oldSearchBarMaker(){

    if(OldSearches.length!=0){

        suggerstionBar.innerHTML=`<button class="text-sm text-red-600 bg-black w-full rounded-b-md clearHistory">Clear history</button>`;

        OldSearches = JSON.parse( localStorage.getItem(`Old Searches`) );

        OldSearches.forEach(element => {
            
            let newElem = document.createElement(`div`);
            newElem.className = `border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white w-44`;
            newElem.innerHTML = `<span class="OldCity w-full cursor-pointer">${element}</span>`;
            suggerstionBar.prepend(newElem);
    
        });
      clearHistor.classList.remove(`hidden`);
    } else {
          clearHistor.classList.add(`hidden`);
    }
    searcher.value=``

}

oldSearchBarMaker();

UserName.innerHTML=currentUser;

searcher.addEventListener(`keydown`,(event)=>{

    if (event.which==13){

        Fetcher(searcher);

    }

});

let shouldHide=true;

searcher.addEventListener(`mouseover`, () => {
    // oldSearchBarMaker();
    shouldHide = false;
    if ( suggerstionBar.children.length>1 ){
    suggerstionBar.classList.remove(`hidden`);}
  });
  
  searcher.addEventListener(`mouseout`, () => {
    shouldHide = true;
    setTimeout(() => {
      if (shouldHide && !suggerstionBar.matches(`:hover`)) {
        suggerstionBar.classList.add(`hidden`);
      }
    }, 50);
  });
  
  suggerstionBar.addEventListener(`mouseover`, () => {
    // oldSearchBarMaker();
    shouldHide = false;
    suggerstionBar.classList.remove(`hidden`);
  });
  
  suggerstionBar.addEventListener(`mouseleave`, () => {
    shouldHide = true;
    setTimeout(() => {
      if (shouldHide && !suggerstionBar.matches(`:hover`)) {
        suggerstionBar.classList.add(`hidden`);
      }
    }, 50);
  });

suggerstionBar.addEventListener(`click`, (event) => {
       if (event.target.classList.contains(`clearHistory`)){
            localStorage.removeItem(`Old Searches`);
            clearHistor.classList.add(`hidden`);
            suggerstionBar.classList.add(`hidden`)
            oldSearchBarMaker();
       } else {

        Fetcher( event.target );
         
       }
});

Theme.addEventListener(`click`,() => {
  body.classList.toggle(`dark`);
  Backgrounder(currentWearherStatus);
  if ( body.classList.contains(`dark`)){
    Theme.setAttribute(`name`, `sunny-outline`)
  } else {
    Theme.setAttribute(`name`, `moon`)
  }
});

// localStorage.setItem(`Old Searches`, JSON.stringify([`Tehran`, `Berlin`, `Rome`, `London`, `New york`, `Tokyo`]))
