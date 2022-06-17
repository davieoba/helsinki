import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
const apiKey = process.env.REACT_APP_API_KEY

function DisplayCountries({ props }) {
  const [click, setClick] = useState(false)
  const [country, setCountry] = useState(null)

  // create a state where the button is false and then just all the countries are displayed 

  // if the button is clicked then I want to get the country that was clicked and pass in the details as a prop into country template component

  // filter the country from the props that is passed into this component


  function handleClick(e) {
    setClick(!click)

    const country = props?.filter((el) => {
      return el?.name.common === e.target.id
    })

    console.log(country)

    setCountry(country)
  }

  const countryElement = props?.map((el) => {
    return <div key={el.name.common} className='country_list'>
      <li>{el.name.common}</li> <button onClick={handleClick} id={el.name.common}> click !</button>
    </div>
  })

  function render() {
    if (!click) {
      return <div>
        {countryElement}
      </div>
    } else {
      return <CountryTemplate country={country[0]} />
    }
  }

  return (
    <div>
      {render()}
    </div>
  )

}

const CountryTemplate = ({ country }) => {
  const [weather, setWeather] = useState()
  // get the weather of the current country

  const [lat, lng] = country?.latlng
  // console.log(lat, lng)
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`).then((res) => {
      setWeather(res.data)
    })
  }, [lat, lng])


  function getLangauges() {
    const arr = []
    for (const x in country?.languages) {
      arr.push(country?.languages[x])
    }
    return arr
  }

  return (
    <>
      <h1>{country?.name?.common}</h1>

      <p>Capital: {country?.capital?.[0]}</p>
      <p>Area: {country?.area}</p>

      <div>
        <h4>Languages:</h4>
        <ul>
          {getLangauges().map((el) => <li key={el}>{el}</li>)}
        </ul>
      </div>

      <div>
        <img src={country?.flags?.png} alt="country image" />
      </div>

      <WeatherTemplate props={weather} />
    </>
  )
}

function WeatherTemplate({ props }) {
  console.log(props)

  // render the weather 
  return (
    <div>
      <h3>Weather in {props?.name}</h3>

      <p>Temperature: {props?.main?.temp} Celcius</p>

      <div>
        <img src={`http://openweathermap.org/img/wn/${props?.weather[0]?.icon}@2x.png`} alt="weather image" />
      </div>

      <p>wind {props?.wind?.speed} m/s</p>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState()
  const [countryName, setCountryName] = useState({
    country: ""
  })

  // get all the countries
  useEffect(() => {
    axios.get(`http://restcountries.com/v3.1/all`).then(res => {
      const data = res.data
      // console.log(data)

      setCountries(data)
    })

  }, [])

  // get the user input 
  const handleChange = (e) => {
    setCountryName((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  //  filter it based on user input
  const filterCountryByName = countries?.filter(el => {
    // convert the first letter to uppercase
    const { country } = countryName
    let splitting = country?.split('')
    let first = splitting[0]?.toUpperCase()
    splitting.splice(0, 1, first)
    let final = splitting.join('')

    // if (el?.name?.common.includes(countryName.country)) {
    if (el?.name?.common.includes(final)) {

      return el
    }
  })

  // handle the country display
  function displayCountryList() {
    if (filterCountryByName?.length > 10) {
      return <>Too many matches, specify another filter</>
    } else if (filterCountryByName?.length < 10 && filterCountryByName?.length > 1) {
      return <DisplayCountries props={filterCountryByName} />
    } else if (filterCountryByName?.length === 1) {
      return <CountryTemplate country={filterCountryByName[0]} />
    }
  }


  return (
    <div className="App">
      <div className='country_input'>
        find countries <input type="text" onChange={handleChange} name='country' />
      </div>

      {displayCountryList()}

    </div>
  );
}

export default App;
