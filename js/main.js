"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let joke;
const button = document.querySelector('.joke-bttn');
const jokeText = document.getElementById('jokeText');
const reportJokes = [];
// get API 
//dad jokes
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://icanhazdadjoke.com/', { headers: {
                Accept: 'application/json'
            }
        });
        const data = yield response.json();
        joke = data.joke;
        return data.joke;
    }
    catch (err) {
        console.error("Unable to fetch data. Please try again");
    }
    ;
    showButtons();
});
//Chuck Norris jokes
const getJoke2 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.chucknorris.io/jokes/random');
        const data = yield response.json();
        const joke = data.value;
        return joke;
    }
    catch (err) {
        console.error("Unable to fetch data. Please try again");
    }
    ;
    showButtons();
});
button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const useFirstAPI = Math.random() < 0.5;
    joke = useFirstAPI ? yield getJoke() : yield getJoke2();
    console.log(joke);
    jokeText.textContent = joke;
}));
// Jokes score buttons
const showButtons = () => {
    const elements = document.querySelectorAll('.score-bttn');
    elements.forEach((element) => {
        element.style.display = 'block';
    });
};
const jokeScore = (score) => __awaiter(void 0, void 0, void 0, function* () {
    let report = {
        joke: joke,
        score: score,
        date: new Date().toISOString(),
    };
    reportJokes.push(report);
    console.table(reportJokes);
});
// get API Weather 
function getLocation() {
    navigator.geolocation.getCurrentPosition(getWeather);
}
;
getLocation();
function getWeather(position) {
    return __awaiter(this, void 0, void 0, function* () {
        const showWeather = document.getElementById('showWeather');
        const { latitude: lat, longitude: lon } = position.coords;
        const key = '00ada020714eeff9dcb90dfa0d069f89';
        const lang = 'ca';
        const units = 'metric';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Unable to fetch weather data');
            }
            const data = yield response.json();
            const temp = Math.round(data.main.temp);
            showWeather.innerHTML = `${"Today"} | ${temp} ºC`;
        }
        catch (err) {
            showWeather.innerHTML = "Error: Unable to fetch weather data";
            console.log(err);
        }
    });
}
