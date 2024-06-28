var temp = document.getElementById('temp');
var cityName = document.getElementById('city');
var weatherDesc = document.getElementById('weather-desc');
var visibility = document.getElementById('visibility');
var humidity = document.getElementById('humidity');
var windspeed = document.getElementById('windspeed');
var searchinput = document.getElementById('searchinput');
var searchbox = document.getElementById('searchbox');
var body_img = document.getElementById('body_img');
var body_data = document.getElementById('body_data');
var detail = document.getElementById('detail');
var error_msg = document.getElementById('error-msg');
var loading = document.getElementById('loading');

async function checkWeather(city) {
    let api_key = 'f27b269d54e4fa1e72993364a80fa8bd';
    loading.style.display = 'block';
    body_data.style.display = 'none';
    detail.style.display = 'none';
    error_msg.innerHTML = '';

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
        let data = await response.json();

        loading.style.display = 'none';

        if (response.ok) {
            temp.innerHTML = Math.floor(data.main.temp) + '°C';
            cityName.innerHTML = data.name;
            weatherDesc.innerHTML = data.weather[0].description;
            visibility.innerHTML = 'Visibility: ' + (data.visibility / 1000).toFixed(1) + ' km';
            humidity.innerHTML = data.main.humidity + "%";
            windspeed.innerHTML = data.wind.speed + ' km/h';

            switch (data.weather[0].main) {
                case 'Clouds':
                    body_img.src = 'image/cloud.png';
                    break;
                case 'Clear':
                    body_img.src = 'image/clear.png';
                    break;
                case 'Rain':
                    body_img.src = 'image/rain.png';
                    break;
                case 'Drizzle':
                    body_img.src = 'image/drizzle.png';
                    break;
                case 'Mist':
                    body_img.src = 'image/mist.png';
                    break;
                case 'Haze':
                    body_img.src = 'image/haze.png';
                    break;
                default:
                    body_img.src = 'image/default.png';
            }

            body_data.style.display = 'flex';
            detail.style.display = 'flex';
        } else {
            error_msg.innerHTML = 'City not found. Please try again.';
        }
    } catch (error) {
        loading.style.display = 'none';
        error_msg.innerHTML = 'An error occurred. Please try again.';
    }
}

searchbox.addEventListener('click', () => {
    let cityIn = searchinput.value.trim();
    if (cityIn) {
        checkWeather(cityIn);
    }
});

searchinput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let cityIn = searchinput.value.trim();
        if (cityIn) {
            checkWeather(cityIn);
        }
    }
});
