import { useState, useEffect } from 'react'
import './App.css'


const IndividualDisplay = ({countryName,allData}) =>{
  if(countryName===null) {
    return(null)
  }
  const [weatherData, setWeatherData] = useState(null)

  const info = allData.filter(countryData => countryData.name.common.toLowerCase() === countryName.toLowerCase())[0]
  const lat = info.latlng[0]
  const long = info.latlng[1]
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=GMT&forecast_days=1`
  useEffect(() =>{
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data)
        console.log(data)
      })
  },[])

  if(weatherData===null){
    return null
  }

  return(
    <>
      <h2>{info.name.common}</h2>
      <p>Capital: {info.capital} </p>
      <p>Area: {info.area} km^2 </p>
      <p>Population: {info.population}</p>
      <p>Lenguages</p>
      <ul>{Object.values(info.languages).map(lan =><li>{lan}</li>)} </ul>
      <img src={info.flags.svg}></img> <hr/>
      <p>Temperature: {weatherData.hourly.temperature_2m[0]} C </p>
      <p>Humidity: {weatherData.hourly.relative_humidity_2m[0]}% </p>
      <p>Wind speed: {weatherData.hourly.wind_speed_10m[0]} m/s  </p>
    </>
  )
}

function App() {
  const [ countriesList, setCountriesList ] = useState(null)
  const [ allData, setAllData ] = useState(null)
  const [ display, setDisplay ] = useState(null)
  const [ countryName, setCountryName] = useState(null)
 

  const url = "https://studies.cs.helsinki.fi/restcountries/api/all"

  useEffect(() =>{ //Hook para conseguir la info de los paises
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => response.json())
      .then(data =>{
        const countries = data.map(country => country.name.common )
        console.log(data[0])
        setCountriesList(countries)
        setAllData(data)
      })

  },[])


  const handleShowBtn = event => {
    const countryName = event.target.getAttribute('id')
    setDisplay(null)
    setCountryName(countryName)
  }

  const handleInput = (event) =>{
    const filtered = countriesList.filter(country => country.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filtered.length>10){
      setDisplay(<p>too many matches</p>)
      setCountryName(null)
    } else if(filtered.length>1) {
      setDisplay(<ul>{filtered.map((country,i)=><li>{country}<button key={i} id={country} onClick={handleShowBtn}>show</button></li>)}</ul>)
      setCountryName(null)
    } else if (filtered.length===1) {
      const info = allData.filter(countryData => countryData.name.common.toLowerCase() === filtered[0].toLowerCase())[0]
      setDisplay(null)
      setCountryName(filtered[0])
    }
    
  }


  if (countriesList===null){
    return(
      <p>loading...</p>
    )
  }

  return (
    <div className='m-5'>
      <h1 className="display-3">Countries</h1>
      <label>Find countries</label><input className="mx-4" onChange={handleInput}></input>
      <div>
        {display}
        <IndividualDisplay countryName={countryName} allData={allData} />
      </div>
    </div>
  )
}

export default App
