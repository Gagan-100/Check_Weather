document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "1b91fc750a2358be972fa2269a7e30bd"; 
    const input = document.getElementById('cityInput');
    const btn = document.getElementById('getWeatherBtn');
    const cityName = document.getElementById('cityName');
    const temp = document.getElementById('temperature');
    const desc = document.getElementById('description');
    const icon = document.getElementById('weatherIcon');

    btn.addEventListener('click', async () => {
        const city = input.value.trim();
        if (!city) return alert("Enter a city name!");

        // Reset UI
        cityName.textContent = "Loading...";
        temp.textContent = "";
        desc.textContent = "";
        icon.textContent = "";

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            console.log(data);

            const weather = data.weather[0];
            const main = data.main;

            cityName.textContent = data.name;
            temp.textContent = `${main.temp.toFixed(1)} °C`;
            desc.textContent = capitalize(weather.description);
            icon.textContent = getWeatherEmoji(weather.main);

        } catch (err) {
            console.error(err);
            cityName.textContent = "Not Found";
            temp.textContent = "--";
            desc.textContent = "City not found!";
            icon.textContent = "❌";
        }
    });

    function getWeatherEmoji(condition) {
        const emojis = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Drizzle: "🌦️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Mist: "🌫️",
            Haze: "🌁",
            Smoke: "🚬",
            Fog: "🌁",
            Tornado: "🌪️"
        };
        return emojis[condition] || "🌈";
    }

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
});
