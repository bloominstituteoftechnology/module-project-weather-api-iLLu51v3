// import axios from "axios"
async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

// 👉 Tasks 1 - 5 go here:
  // 👉 TASK 1 - Hide the div#weatherWidget
  // 👉 TASK 2 - Add an event listener to the dropdown
    // In index.HTML: drop down for city selectionsection id // Reminder: simple eventListener(action, listener)
    // TASK 2.1 - set the drop down to be hidden/disabled once a selection is made
  // 👉 TASK 3 - Prepare to fetch the weather data --> An event spinner
  // 👉 TASK 4 - Launch a request to the weather API
  // 👉 TASK 5 - Handle data fetching success 
  document.querySelector('#weatherWidget').style.display = 'none'
  document.querySelector('#citySelect').addEventListener('change', async evt => {
    console.log('city selected')
    try {                                       
      document.querySelector('#citySelect').setAttribute('disabled', 'disabled') // setAttribute(name, value)
      document.querySelector('#weatherWidget').style.display = 'none' // hides widget when loading a new selection change
      document.querySelector('.info').textContent = 'Fetching Weather Data...' // adds fetching data spinner
      

      console.log(evt.target.value)
      
      let selectedCity = evt.target.value
      let url = `http://localhost:3003/api/weather?city=${selectedCity}`
      // console.log(url)

      const res = await axios.get(url)

      document.querySelector('#weatherWidget').style.display = 'block'
      document.querySelector('.info').textContent = ''
      evt.target.removeAttribute('disabled')

      // console.log(res.data)
      let {data} = res

      document.querySelector('#apparentTemp div:nth-child(2)')
        .textContent = `${data.current.apparent_temperature}°`
      document.querySelector('#todayDescription')
        .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1]
      document.querySelector('#todayStats div:nth-child(1)')
        .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
      document.querySelector('#todayStats div:nth-child(2)')
        .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
      document.querySelector('#todayStats div:nth-child(3)')
        .textContent = `Humidity: ${data.current.humidity}%`
      document.querySelector('#todayStats div:nth-child(4)')
        .textContent = `Wind: ${data.current.wind_speed}m/s`

      data.forecast.daily.forEach((day, idx) => { // array of days --> for each day, according to the index of card [0,1,2], the following information will be applied
        let card = document.querySelectorAll('.next-day')[idx]
          
        let weekDay = card.children[0]
        let apparent = card.children[1]
        let minMax = card.children[2]
        let precipit = card.children[3]

        weekDay.textContent = getWeekDay(day.date)
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
      })
      
      document.querySelector('#location').firstElementChild.textContent = data.location.city

    } catch (error) {
      console.log('Do a Barrel Roll!', error.message)
    }
  })
  function getWeekDay(date){
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[new Date(date).getDay()];
  }
  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE BELOW
// ❗ DO NOT CHANGE THE CODE BELOW
// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
