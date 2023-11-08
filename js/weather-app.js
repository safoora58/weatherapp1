const hournum = document.querySelector('#hour-num');
const minutenum = document.querySelector('#minute-num');
const meridiem = document.querySelector('#ampm');

setInterval(() => {
  const datedigital = new Date();
  let h = datedigital.getHours();
  let m = datedigital.getMinutes();
  let ampm;
  if (h > 12) {
    ampm = "PM";
  }
  else {
    ampm = "AM";
  }
  if (h >= 12) {
    h = h - 12;
  } else {
    h = h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  else {
    m = m;
  }

  if (h < 10) {
    h = "0" + h;
  }
  else {
    h = h;
  }
  minutenum.innerHTML = m;
  hournum.innerHTML = h + ":";
  meridiem.innerHTML = ampm;
}, 1000);


const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const yearnum = document.querySelector('#year');
const daynumber = document.querySelector('#day-number');
const dayname = document.querySelector('#weekday-name');
const daynameweek = document.querySelector('.weekday-name');
const monthnum = document.querySelector('#month-name');
const monthname = document.querySelector('.month-name');
const dateTime = new Date();
let year = dateTime.getFullYear();
let day = dateTime.getDate();
let dayweek = dateTime.getDay();
let namedayweek = weekday[dateTime.getDay()];
let namemonth = month[dateTime.getMonth()];
let nummonth = dateTime.getMonth();
yearnum.innerHTML = year;
daynumber.innerHTML = day + ",";
dayname.innerHTML = dayweek;
daynameweek.innerHTML = namedayweek + ",";
monthname.innerHTML = namemonth + ",";

//search
const citySearchBox = document.querySelector('#city-search-box');
const searchList = document.querySelector('.search-list');
const apikey = "9f655254782ec7e3e9d95e4b66ce920c";
let recentSearches = [];
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchBox.value}&appid=${apikey}`;
  const res = await fetch(url);
  const data = await res.json();
  displayCityList(data);
  recentSearches.unshift(data);
  if (recentSearches.length > 5) {
    recentSearches.pop();
  }
  displayRecentSearches(recentSearches);
}

function findCity() {
  let searchTerm = citySearchBox.value;
  if (searchTerm.length > 0) {
    searchList.classList.remove('hide-search-list');
    getWeather();
    displayRecentSearches(recentSearches);
  } else {
    searchList.classList.add('hide-search-list');
  }
}

function displayRecentSearches(recentSearches) {
  searchList.innerHTML = "";
  recentSearches.slice(0, 5).forEach(city => {
    const cityListItem = document.createElement('div');
    cityListItem.classList.add('search-list-item');
    cityListItem.innerHTML = `
      <div class="search-item-info me-3">
        <p class="fw-bold mt-2 opacity-75">${city.name}, ${city.sys.country}</p>
      </div>
    `;
    searchList.appendChild(cityListItem);
    cityListItem.addEventListener('click', async () => {
      loadCityDetails(city);
    });
  });
}

function displayCityList(data) {
  searchList.innerHTML = "";
  const cityListItem = document.createElement('div');
  cityListItem.classList.add('search-list-item');
  cityListItem.innerHTML = `
        <div class="search-item-info me-3">
            <p class="fw-bold mt-2 opacity-75">${data.name},${data.sys.country}</p>
        </div>
    `;
      searchList.appendChild(cityListItem);
  loadCityDetails(data);
}

function loadCityDetails(data) {
  const searchListcities = searchList.querySelectorAll('.search-list-item');
  searchListcities.forEach(city => {

    city.addEventListener('click', async () => {

      let cityName = document.querySelector('.city');
      cityName.innerHTML = `${data.name}, ${data.sys.country}`;

      let temperature = document.querySelector('.temp');
      temperature.innerHTML = `${Math.floor(data.main.temp - 273.15)}°C`;

      let temps = document.querySelector('.hi-low-temp');
      temps.innerHTML = `${Math.floor(data.main.temp_min - 273.15)}°c / ${Math.floor(data.main.temp_max - 273.15)}°c `;

      let humidity = document.querySelector('.humidity');
      humidity.innerHTML = `${data.main.humidity}%`;

      let pressure = document.querySelector('.pressure');
      pressure.innerHTML = `${data.main.pressure} hPa`;

      let sunrise = document.querySelector('.sunrise');
      let sunriseTimestamp = data.sys.sunrise; // زمان گرم 
      let sunriseDate = new Date(sunriseTimestamp * 1000);
      let sunriseTime = sunriseDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      sunrise.innerHTML = sunriseTime;
      let sunset = document.querySelector('.sunset');
      let sunsetTimestamp = data.sys.sunset; // زمان گرم  
      let sunsetDate = new Date(sunsetTimestamp * 1000);
      let sunsetTime = sunsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      sunset.innerHTML = sunsetTime;

      let wind = document.querySelector('.wind');
      wind.innerHTML = `${data.wind.speed} m/s`;

      let visibility = document.querySelector('.visibility');
      visibility.innerHTML = `${(data.visibility) / 1000} km`;

      let description = document.querySelector('.description');
      description.innerHTML = `${data.weather[0].description}`;

      let feelslike = document.querySelector('.feels-like');
      feelslike.innerHTML = `${Math.floor(data.main.feels_like - 273.15)}°c`;

      let CityInfowe = document.querySelector('.City-Info-we');
      CityInfowe.innerHTML = `${data.weather[0].main}`;

      let maincitypic = document.querySelector('.maincitypic img');
      let weatherCode = data.weather[0].id;
     
      if (weatherCode >= 200 && weatherCode < 300) {
        maincitypic.src = "file:///F:/SAFOORA%20PC%20(Codes)/programming/javascript-exercises/DEMO/Demo-8-weather%20app/images/Thunderstorm 2.jpg";
        maincitypic.classList.add('slide');
      } else if (weatherCode >= 300 && weatherCode < 500) {
        maincitypic.src = "file:///F:/SAFOORA%20PC%20(Codes)/programming/javascript-exercises/DEMO/Demo-8-weather%20app/images/Drizzle.jpg";
        maincitypic.classList.add('slide');
      } else if (weatherCode >= 500 && weatherCode < 600) {
        maincitypic.src = "file:///F:/SAFOORA%20PC%20(Codes)/programming/javascript-exercises/DEMO/Demo-8-weather%20app/images/rain2.jpg";
        maincitypic.classList.add('slide');
      } else if (weatherCode >= 600 && weatherCode < 700) {
        maincitypic.src = "file:///F:/SAFOORA%20PC%20(Codes)/programming/javascript-exercises/DEMO/Demo-8-weather%20app/images/snow.jpg";
        maincitypic.classList.add('slide');
      } else if (weatherCode >= 700 && weatherCode < 800) {
        maincitypic.src = "file:///F:/SAFOORA%20PC%20(Codes)/programming/javascript-exercises/DEMO/Demo-8-weather%20app/images/Atmosphere.jpg";
        maincitypic.classList.add('slide');
      } else if (weatherCode == 800) {
        maincitypic.src = "file:///F:/SAFOORA%20PC%20(Codes)/programming/javascript-exercises/DEMO/Demo-8-weather%20app/images/clear1.jpg";
        maincitypic.classList.add('slide');
      } else if (weatherCode > 800 && weatherCode < 900) {
        maincitypic.src = "file:///F:/SAFOORA%20PC%20(Codes)/programming/javascript-exercises/DEMO/Demo-8-weather%20app/images/sky-216118_1280.jpg";
        maincitypic.classList.add('slide');
      }
      searchList.classList.add('hide-search-list');
      citySearchBox.value = '';
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.name}&appid=${apikey}`);
      const cityDetails = await result.json();
      console.log(cityDetails);
      getWeather();
      getLocalTime(data.coord.lat, data.coord.lon);
      displayForecast(data.coord.lat, data.coord.lon);
    });
  })
}
//localtime
async function getLocalTime(lat, lon) {
  const CityInfotime = document.querySelector('.City-Info-time');

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
  const response = await fetch(url);
  const data = await response.json();
  const localTime = new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  CityInfotime.innerHTML = localTime;
  console.log(localTime);
}


// function for 5 days forecast
async function displayForecast(lat, lon) {
  const apikey = "9f655254782ec7e3e9d95e4b66ce920c";
  const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
  const forecastResult = await fetch(forecastAPI);
  const forecastData = await forecastResult.json();
  const dailyForecasts = forecastData.list.filter((item) => item.dt_txt.includes('12:00:00'));
  const forecastElements = document.querySelectorAll('.details-forecast');
  dailyForecasts.forEach((data, index) => {
    if (index < forecastElements.length) {
      const forecastElement = forecastElements[index];
      const day = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
      const temperature = Math.floor(data.main.temp - 273.15);
      const icon = data.weather[0].icon;
      forecastElement.querySelector('.weekday').innerHTML = day;
      forecastElement.querySelector('.img-forecast').src = `https://openweathermap.org/img/w/${icon}.png`;
      forecastElement.querySelector('.tempreture').innerHTML = `${temperature}°C`;
    }
  });
}

