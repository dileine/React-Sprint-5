let joke: string;
const button = document.querySelector('.button-joke')!;
const jokeText = document.getElementById('joke-text')!;

const getJoke = async () => 
{
    try{
    const response = await fetch('https://icanhazdadjoke.com/', 
    {headers: {
        Accept: 'application/json'
    }
});
    const joke = await response.json();
       return joke.joke;
    } catch(err)
    {console.error("sorry there was an error, try again")};
    
};

button.addEventListener('click', async()=>{
    const joke = await getJoke();
    console.log(joke);
    jokeText.textContent = joke;
});