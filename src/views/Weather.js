import './Weather.scss'
import sun from '../assets/sun.svg'
import { useSelector } from 'react-redux'
import smallSun from '../assets/smallSun.svg'
import searchIcon from '../assets/searchIcon.svg'
import navSunIcon from '../assets/navSunIcon.svg'
import NavBar from '../components/Navbar'
function Sunny() {
  const weather = useSelector((state) => {
    return state.weather
  })

  function showHour(unixTimestamp, offset = 0) {
    let timestamp = (unixTimestamp + offset) * 1000
    let dateObj = new Date(timestamp)
    let utcString = dateObj.toUTCString()
    let time = utcString.slice(-12, -7)
    return time
  }
  return (
    <div className="weatherWrapper">
      <NavBar />
      {weather.current && (
        <main>
          <h1>{weather.current.weather[0].description}</h1>
          <img src={sun} alt="weather" className="weatherImage" />

          <h2 className="grader">{Math.round(weather.current.temp)}°</h2>

          <p className="city">
            {'Latitude ' + weather.lat + ' Longitude ' + weather.lon}
          </p>
          <p className="time">
            {showHour(weather.current.dt, weather.timezone_offset)}
          </p>
          <table>
            <tbody>
              {weather.hourly.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={smallSun} alt="sun" />
                    </td>
                    <td>{showHour(item.dt)}</td>
                    <td>{Math.round(item.temp)}C</td>
                    <td>{item.humidity}%</td>
                    <td>{item.pressure}hPa</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      )}
    </div>
  )
}

export default Sunny
