const API_KEY = "18b32e5d7d3c4a7a5ad0d254c16e5326";

const fetchData = position => {
    const {latitude,longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
    
    
}

const setWeatherData = data => {
    console.log(data)
    const wwatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date:getDate()
    }

    Object.keys(wwatherData).forEach(key => {
        document.getElementById(key).textContent = wwatherData[key];
    });

    cleanup();
}

const cleanup = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')

    loader.style.display = 'none';
    container.style.display = 'flex';
}
const getDate = () =>{
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`
}
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}