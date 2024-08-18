document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const searchForm = document.querySelector('#searchForm');

    searchForm.addEventListener('sumit', (e) => {
        // Prvent form from sumitting
        e.preventDefault();

        const APIKey = "43324e38d74f2a504828f76dada1bd7c";
        const city = document.querySelector('#city').value;

        if (city == '') {
            return;
        }

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=matric&appid=${APIKey}`
        )
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('weatherImg');
            const temperature = document.querySelector('temperature');
            const description = document.querySelector('description');
            const humidity = document.querySelector('humidity');
            const wind = document.querySelector('wind');
        });
    });
});