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
const showButtons = () => {
    const elements = document.querySelectorAll('.score-bttn');
    elements.forEach((element) => {
        element.style.display = 'block';
    });
};
const reportJokes = [];
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
        console.error("sorry there was an error, try again");
    }
    ;
    showButtons();
});
button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const joke = yield getJoke();
    console.log(joke);
    jokeText.textContent = joke;
}));
const jokeScore = (score) => __awaiter(void 0, void 0, void 0, function* () {
    let report = {
        joke: joke,
        score: score,
        date: new Date().toISOString(),
    };
    reportJokes.push(report);
    console.table(reportJokes);
});
