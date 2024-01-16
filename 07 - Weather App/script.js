const apiKey = "f2a3b054ec7a790bc40e7618a16f6f71";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    error.style.display = "block";
    checkWeather(cityName.innerHTML);
  }

  const data = await response.json();
  console.log(data);

  cityName.innerHTML = data.name;
  temp.innerHTML = `${Math.round(data.main.temp)}°C`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${Math.round(data.wind.speed)} m/s`;

  //Change
  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "./images/clouds.png";
  }
  if (data.weather[0].main === "Clear") {
    weatherIcon.src = "./images/clear.png";
  }
  if (data.weather[0].main === "Rain") {
    weatherIcon.src = "./images/Rain.png";
  }
  if (data.weather[0].main === "Mist") {
    weatherIcon.src = "./images/Mist.png";
  }
  if (data.weather[0].main === "Snow") {
    weatherIcon.src = "./images/Snow.png";
  }

  //Change Digits
  temp.addEventListener("click", changeDigits);
  wind.addEventListener("click", changeDigits);
}

checkWeather("Sweden");

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  error.style.display = "none";
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
    error.style.display = "none";
  }
});

function changeDigits(e) {
  if (e.target.classList.contains("wind")) {
    const speedText = e.target.innerHTML;
    const speed = parseFloat(speedText);
    const currentUnit = speedText.includes("m/s") ? "m/s" : "km/h";
    const newUnit = currentUnit === "m/s" ? "km/h" : "m/s";
    const convertedSpeed =
      currentUnit === "m/s" ? speed / 0.27778 : speed * 0.27778;
    e.target.innerHTML = `${Math.round(convertedSpeed)} ${newUnit}`;
  }

  if (e.target.classList[0] === "temp") {
    const currentUnit = e.target.getAttribute("data-unit") || "°C";
    const temp = parseFloat(e.target.innerHTML);
    const newUnit = currentUnit === "°C" ? "°F" : "°C";
    let newTemp;

    if (currentUnit === "°C") {
      newTemp = (temp * 9) / 5 + 32;
    } else {
      // Convert Fahrenheit to Celsius
      newTemp = ((temp - 32) * 5) / 9;
    }

    e.target.innerHTML = `${Math.round(newTemp)} ${newUnit}`;
    e.target.setAttribute("data-unit", newUnit);
  }
}
