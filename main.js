
const APIKey = "43324e38d74f2a504828f76dada1bd7c";

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const searchForm = document.querySelector('#searchForm');

    searchForm.addEventListener('submit', (e) => {
        // Prvent form from sumitting
        e.preventDefault();

        const city = document.querySelector('#city').value;

        if (city == '') {
            return;
        }

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        )
        .then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                alert("Location not found!");
                return;
            }
            const image = document.querySelector('#weatherImg');
            const temperature = document.querySelector('#temperature');
            const description = document.querySelector('#description');
            const humidity = document.querySelector('#humidity');
            const wind = document.querySelector('#wind');

            if (['Clouds', 'Clear', 'Mist', 'Rain', 'Snow', 'Haze'].includes(json.weather[0].main)) {
                image.src = `images/${json.weather[0].main}.png`;
            } else {
                image.src = 'images/Haze.png';
            }
            
            temperature.innerHTML = `${parseInt(json.main.temp)}`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}`;
            wind.innerHTML = `${parseFloat(json.wind.speed)}`;

        });
    });
});

// Function to get the location
function get_location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            let location = getLocationName(latitude, longitude);

            document.querySelector('#city').value = location;
            document.querySelector('#searchForm').submit();

        });
    }
    else {
        alert("Location in not supported by this browser!");
    }
}

function getLocationName(latitude, longitude) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${APIKey}`)
    .then(response => response.json())
    .then (data => {
        const location = data.result[0].formatted;
        return location;
    })
    .catch(error => alert("Unable to get location!"));
}
