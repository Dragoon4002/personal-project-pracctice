const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");


search.addEventListener('click',()=>{
    const APIkey = /*Your Api key that you can get from logging-in in https://openweathermap.org/api*/;
    const city = document.querySelector(".search-box input").value;

    if(city=== '')
        return ;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response =>response.json())
    .then(json=>{
        if(json.cod ==='404'){
            container.style.height = '400px';
            weatherBox.style.display= 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        container.style.height = '400px';
        weatherBox.style.display= 'block';
        weatherDetails.style.display = 'block';
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        if(json.weather[0].main.includes("Clear"))
            image.src = 'images/clear.png';
        else if(json.weather[0].main.includes("Cloud"))
            image.src = 'images/cloud.png';
        else if(json.weather[0].main.includes("Mist"))
            image.src = 'images/mist.png';
        else if(json.weather[0].main.includes("Rain"))
            image.src = 'images/rain.png';
        else if(json.weather[0].main.includes("Snow"))
            image.src = 'images/snow.png';
        else
            image.src = '';
        /*
        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'image/clear.png';
                break;
            case 'Cloud':
                image.src = 'image/cloud.png';
                break;
            case 'Mist':
                image.src = 'image/mist.png';
                break;
            case 'Rain':
                image.src = 'image/rain.png';
                break;
            case 'Snow':
                image.src = 'image/snow.png';
                break;
            default:
                image.src = '';
        }
        */

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/Hr`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '600px';
    })
})
