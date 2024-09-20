document.addEventListener('DOMContentLoaded', function() {

    const apiKey = '3f15fb89b8dfd9fed7bfe07c150973ff';

    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("searchBtn");
    const cityName = document.getElementById("cityName");
    const countryName = document.getElementById("countryName");
    const temperature = document.getElementById("temperature");
    const weatherInfo = document.getElementById("weatherDescription");
    const weatherIcon = document.getElementById("weatherIcon");

    /* Обновление информации */
    function updateWeatherInfo(data) {
        cityName.textContent = data.name;
        countryName.textContent = data.sys.country;
        temperature.textContent = `${Math.round(data.main.temp)}`;
        weatherInfo.textContent = data.weather[0].description; 
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    /* Получение данных о погоде */
    async function fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=ru`);
            if (response.ok) {
                const data = await response.json();
                updateWeatherInfo(data);
            } else {
                cityName.textContent = "Город не найден...";
                temperature.textContent = "--";
                weatherInfo.textContent = "Неизвестно...";
                countryName.textContent = "N/A";
            }
        } catch (error) {
            console.error("Ошибка при получении данных о погоде:", error);
        }
    }

    /* Обработчик клика по кнопке */
    searchBtn.addEventListener("click", function(event) {
        event.preventDefault(); 
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
});
