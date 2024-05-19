// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6b76294b8189abedc3827f2b8cace4bc
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

const API_KEY = "&appid=6b76294b8189abedc3827f2b8cace4bc ";
const GEO_URL = "http://api.openweathermap.org/geo/1.0/direct?q=";
const FIRST_PART = "https://api.open-meteo.com/v1/forecast?";
const LAST_PART = "&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"


const input = document.querySelector(".cityName");
const submit = document.querySelector(".submit");
submit.addEventListener("click", (e) => {
    e.preventDefault();
    const cityName = input.value;
    const URL = `${GEO_URL}${cityName}&limit=1${API_KEY}`;
    console.log(URL);
    console.log(input.value);
    getGeoLocation(URL)
})


function displayWeather(data) {
    console.log(data.current);
    const currentWeather = data.current;
    document.querySelector(".weather-display").innerHTML = `
        <p style="font-family: 'Arial Rounded MT Bold'; font-weight: bold; ">Temperature: ${currentWeather.temperature_2m}°C</p>
        <p  style="font-family: 'Arial Rounded MT Bold'; font-weight: bold; ">Time: ${currentWeather.time}</p>
        <p  style="font-family: 'Arial Rounded MT Bold'; font-weight: bold; ">Wind speed: ${currentWeather.wind_speed_10m}</p>
    `;

}

const getWeather = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data)
        })
        .catch(error => console.log(error));
};

const getGeoLocation = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            const {lat, lon} = data[0];
            console.log(lat, lon);
            const URL = `${FIRST_PART}latitude=${lat}&longitude=${lon}${LAST_PART}`;
            getWeather(URL);
        })
        .catch(error => console.log(error));
};