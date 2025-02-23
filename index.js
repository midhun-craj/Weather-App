// Weather App

// used api from openWeatherMap

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8e9d7822bb275015945f4ef73c2ea209";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch(error) {
            console.error(error);
            displayError(error);
        }

    } else {
        displayError("Please enter a city name!");
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    // console.log(response);

    if(!response.ok) {
        throw new Error("Can't fetch the weather details.");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    // console.log(data);

    const {name: city, 
           main: {humidity, temp}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const displayCityName = document.createElement("h1");
    const displayTemp = document.createElement("p");
    const displayHumidity = document.createElement("p");
    const displayDesc = document.createElement("p");
    const displayEmoji = document.createElement("p");

    displayCityName.textContent = city;
    displayTemp.textContent = `${(temp -273.15).toFixed(1)}°C`;
    // displayTemp.textContent = `${((temp -273.15) * (9/5) + 32).toFixed(1)}°F`;
    displayHumidity.textContent = `Humidity:${humidity}%`;
    displayDesc.textContent = description;
    displayEmoji.textContent = getWeatherEmoji(id);

    displayCityName.classList.add("cityDisplay");
    displayTemp.classList.add("tempDisplay");
    displayHumidity.classList.add("humidityDisplay");
    displayDesc.classList.add("descDisplay");
    displayEmoji.classList.add("weatherEmoji");

    card.appendChild(displayCityName);
    card.appendChild(displayTemp);
    card.appendChild(displayHumidity);
    card.appendChild(displayDesc);
    card.appendChild(displayEmoji);
}

function getWeatherEmoji(weatherId) {
    switch(true) {
        case(weatherId >= 200  && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300  && weatherId < 400):
            return "🌦️";
        case(weatherId >= 500  && weatherId < 600):
            return "🌧️";
        case(weatherId >= 600  && weatherId < 700):
            return "🌨️";
        case(weatherId >= 700  && weatherId < 800):
            return "🌫️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId >= 801  && weatherId < 810):
            return "☁️";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}