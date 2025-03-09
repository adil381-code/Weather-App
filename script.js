document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "d053d040f2ac532ae243e3f9d734ee35"; // Use your actual API key

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
            console.error(error); // Debugging error messages
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");

        const data = await response.json();
        console.log(data); // Debugging: Shows response in console
        return data;
    }

    function displayWeatherData(weatherData) {
        cityNameDisplay.textContent = weatherData.name;
        temperatureDisplay.textContent = `Temperature: ${weatherData.main.temp}°C`;
        descriptionDisplay.textContent = `Weather: ${weatherData.weather[0].description}`;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});
