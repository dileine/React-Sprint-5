let joke: string;
const button = document.querySelector('.joke-bttn')!;
const jokeText = document.getElementById('jokeText')!;

const reportJokes: { joke: string; score: number; date: string; }[] =[];

// get API jokes

const getJoke = async () => 
{
    try{
    const response = await fetch('https://icanhazdadjoke.com/', 
    {headers: {
        Accept: 'application/json'
    }
});
    const data = await response.json();
     joke = data.joke;
       return data.joke;
    } catch(err)
    {console.error("sorry there was an error, try again")
    };
    showButtons();

};

button.addEventListener('click', async()=>{
    const joke = await getJoke();
    console.log(joke);
    jokeText.textContent = joke;
});

// Jokes score buttons

const showButtons = () => {
    const elements = document.querySelectorAll('.score-bttn');
    elements.forEach((element)=> {
        (element as HTMLElement).style.display='block';
});
};

const jokeScore = async (score: number) => {
    let report = {
      joke: joke,
      score: score,
      date: new Date().toISOString(),
    };
  
    reportJokes.push(report);
    console.table(reportJokes);
  }

  // get API Weather 

  function getLocation() {
    navigator.geolocation.getCurrentPosition(getWeather);
  };
    
  getLocation();

  async function getWeather(position: GeolocationPosition){
    const showWeather = document.getElementById('showWeather') as HTMLAnchorElement;
    const { latitude: lat, longitude: lon} = position.coords;
    const key = '00ada020714eeff9dcb90dfa0d069f89';
    const lang = 'ca';
    const units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error ('Unable to fetch weather data');
        }
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        //const iconUrl =`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        //const description = data.weather[0].description;
       // const icon = `<img src="${iconUrl}" alt="${description}" class="weather-icon"/>`;
        showWeather.innerHTML = `${"Today"} | ${temp} ºC`;
    } catch (err){
        showWeather.innerHTML = "Error: Unable to fetch weather data";
        console.log(err);
    }
}





  