const apiKey = '9640dc04eb6e35c56fe5517a5dee5305';
const citySearch = $('.city-info');
const $searchBtn = $('.button');
const $forecastOutput = $('.forecast-output');

function getWeather(cityName) {
    const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    return $.get(cityURL);
}

function outputCurrentWeather(currentData) {
    return currentData.coord;
}

function getLocationForecast(data) {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}&units=imperial`;
    return $.get(forecastURL);
}

function outputWeatherForecast(data) {
    const filtered = data.list.filter(function(weatherObj) {
        if (weatherObj.dt_txt.includes('12:00')) return true;
    });

    $forecastOutput.empty();

    filtered.forEach(function(weatherObj) {
        $forecastOutput.append(`
            <div class="has-text-centered class">
                <p>${weatherObj.dt_txt}</p>
                <p>Temp: ${weatherObj.main.temp}&deg;</p>
                <p>Wind: ${weatherObj.wind.speed} mph</p>
                <p>Humidity: ${weatherObj.main.humidity}%</p>
                <img src="https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}.png" >
            </div>
        `);
    });
}

$searchBtn.on('click', function () {
    const cityName = citySearch.val();
    getWeather(cityName)
        .then(outputCurrentWeather)
        .then(getLocationForecast)
        .then(outputWeatherForecast)
});