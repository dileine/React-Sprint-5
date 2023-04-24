let joke: string;
const button = document.querySelector('.joke-bttn')!;
const jokeText = document.getElementById('jokeText')!;

const showButtons = () => {
    const elements = document.querySelectorAll('.score-bttn');
    elements.forEach((element)=> {
        (element as HTMLElement).style.display='block';
});
};

const reportJokes: { joke: string; score: number; date: string; }[] =[];

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




const jokeScore = async (score: number) => {
    let report = {
      joke: joke,
      score: score,
      date: new Date().toISOString(),
    };
  
    reportJokes.push(report);
    console.table(reportJokes);
  }