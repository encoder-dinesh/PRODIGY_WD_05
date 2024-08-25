let tl = gsap.timeline()
let tl2 = gsap.timeline()

tl.from(".headline", {
    y: 20,
    opacity: 0,
    delay: 0.5
})
tl.from(".searchBox", {
    y: 20,
    opacity: 0,
    delay: 0.2
})
tl.from(".searchBtn", {
    y: 20,
    opacity: 0,
    delay: 0.2
})

// API Key
const APIKEY = '2242cedebe3389fef11acabeb6bff198';

// Search Box & Button
const userInput = document.querySelector(".searchBox")
const searchBtn = document.querySelector(".searchBtn")

// HTML Elements
const weatherIcon = document.getElementById("weatherIcon")
const temp = document.querySelector(".temp")
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const locationDesc = document.querySelector(".locationDesc")
const weatherDesc = document.querySelector(".weatherDesc")

// API Data Function
async function getData(APIKEY, userInput) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${APIKEY}&units=metric`)
    return await promise.json();
}

// Displaying Data Function
searchBtn.addEventListener("click", async () => {
    const input = userInput.value;
    const result = await getData(APIKEY, input)
    const icon = result.weather[0].icon

    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`
    temp.innerHTML = `${Math.round(result.main.temp)}°C`;
    humidity.innerHTML = `${result.main.humidity}%`;
    wind.innerHTML = `${Math.round(result.wind.speed * 3.6)} km/h`;
    locationDesc.innerHTML = `${result.name}`;
    weatherDesc.innerHTML = `${result.weather[0].main}`;
    
    console.log(result);

    document.querySelector(".weatherCard").style.visibility = "visible"

    tl2.from(".weatherIcon", {
        y: 20,
        opacity: 0,
    })
    tl2.from(".weatherInfo h3", {
        y: 20,
        opacity: 0,
        stagger: 0.2
    })
    
})