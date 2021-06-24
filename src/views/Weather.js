import './Weather.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import gsap from 'gsap'
import NavBar from '../components/Navbar'
function Weather() {
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

  let weatherImage = useRef(null)

  useEffect(() => {
    let tl = gsap.timeline({ defaults: {} })
    if (weatherImage !== null) {
      tl.from(weatherImage, { y: 299, duration: 3, ease: 'power3.out' })
    }
  }, [])
  return (
    <div className="weatherWrapper">
      <NavBar />
      {weather.current && (
        <main>
          <h1>{weather.current.weather[0].description}</h1>
          <img
            src={
              require(`../assets/${weather.current.weather[0].icon}.png`)
                .default
            }
            alt="weather"
            className="weatherImage"
            ref={(el) => (weatherImage = el)}
          />

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
                      <img
                        src={
                          require(`../assets/${item.weather[0].icon}.svg`)
                            .default
                        }
                        alt="sun"
                        className="tableIcon"
                      />
                    </td>
                    <td>{showHour(item.dt, weather.timezone_offset)}</td>
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
      {weather.weather ? (
        <main>
          <h1>{weather.weather[0].description}</h1>
          <img
            src={require(`../assets/${weather.weather[0].icon}.png`).default}
            alt="weather"
            className="weatherImage"
          />

          <h2 className="grader">{Math.round(weather.main.temp)}°</h2>

          <p className="city">{weather.name}</p>
          {/* <p className="time">
            {showHour(weather.current.dt, weather.timezone_offset)}
          </p> */}
          <table>
            <tbody>
              <tr>
                <td>
                  <img
                    src={
                      require(`../assets/${weather.weather[0].icon}.svg`)
                        .default
                    }
                    alt="sun"
                    className="tableIcon"
                  />
                </td>
                <td>{showHour(weather.dt, weather.timezone)}</td>
                <td>{Math.round(weather.main.temp)}C</td>
                <td>{weather.main.humidity}%</td>
                <td>{weather.main.pressure}hPa</td>
              </tr>
              <tr>
                <td>
                  {showHour(weather.sys.sunrise, weather.timezone)} sunrise
                </td>
                <td>{showHour(weather.sys.sunset, weather.timezone)}s unset</td>
              </tr>
            </tbody>
          </table>
        </main>
      ) : (
        ''
      )}
    </div>
  )
}

export default Weather
