import './Search.scss'
import { useState, useEffect, useRef } from 'react'
import { setWeather } from '../actions/weatherAction'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import lottie from 'lottie-web'
import gsap from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)

function Search() {
  let leftIcon = useRef()
  let rightIcon = useRef()
  let inputField = useRef()
  let button = useRef()

  const dispatch = useDispatch()
  const history = useHistory()

  function getCordinates() {
    gsap.to(rightIcon, { rotate: 360, duration: 1, ease: ' steps( 12)' })
    let x = document.getElementById('gpsMessage')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      x.innerHTML = 'Geolocation funkar inte på den här webbläsaren'
    }

    function showPosition(position) {
      document.querySelector(
        '.inputCity'
      ).value = `${position.coords.latitude} ${position.coords.longitude}`
    }
  }
  function handleClick() {
    // let cordinates = document.querySelector('.inputCity').value.split(' ')
    let cordinates = inputField.value.split(' ')
    let lat = cordinates[0]
    let lon = cordinates[1]

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=768b3d2e108901bd5d3f1094802db7de`
    )
      .then((response) => response.json())
      .then((weather) => dispatch(setWeather(weather)))
    history.push('/weather/')
  }

  const [state, setState] = useState({
    value: ''
  })

  const handleChange = (e) => {
    setState({
      [e.target.value]: e.target.value
    })
  }

  async function fetchWeather() {
    if (inputField.value) {
      let apiKey = '768b3d2e108901bd5d3f1094802db7de'
      // let city = document.querySelector('.inputCity').value
      let city = inputField.value

      //REGULAR EXPRESSION
      const r = /^[0-9]/

      let response

      if (!r.test(city)) {
        response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sv`
        )
      } else {
        // let cordinates = document.querySelector('.inputCity').value.split(' ')
        let cordinates = inputField.value.split(' ')

        let lat = cordinates[0]
        let lon = cordinates[1]
        response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=sv&exclude=minutely&units=metric&appid=${apiKey}`
        )
      }

      const data = await response.json()
      console.log(data)
      dispatch(setWeather(data))
      gsap.to(inputField, {
        opacity: 0,
        scale: 1000,
        duration: 0.5,
        ease: ' elastic. out( 1, 0.3)'
      })
      gsap.to(button, { opacity: 0, duration: 0.4, ease: 'power2.out' })
      loadLottie()
      setTimeout(() => history.push('/weather/'), 2000)
    }
  }

  function loadLottie() {
    const svgContainer = document.getElementById('svg')
    const animItem = lottie.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: false,
      autoplay: false,
      path: 'https://assets10.lottiefiles.com/datafiles/Tj3Hd1X74Once2j/data.json'
    })
    // svgContainer.classList.remove('hide')
    animItem.goToAndPlay(0, true)
    // animItem.addEventListener('complete', () => {
    //   svgContainer.classList.add('hide')
    // })
  }
  useEffect(() => {
    function showClick() {
      const ClickContainer = document.getElementById('clickMe')
      const animItem2 = lottie.loadAnimation({
        wrapper: ClickContainer,
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets10.lottiefiles.com/packages/lf20_b0teeyo9.json'
      })
      animItem2.goToAndPlay(0, true)
    }
    showClick()

    let tl = gsap.timeline({ defaults: {} })

    tl.from(leftIcon, {
      y: -200,
      duration: 0.8,
      rotation: 360,
      ease: 'power2.out'
    })
      .from(
        rightIcon,
        {
          y: -200,
          duration: 0.8,
          rotation: 360,
          opacity: 0,

          ease: 'power2.out'
        },
        '-=0.6'
      )
      .from(
        inputField,
        {
          opacity: 0,
          duration: 0.7,
          y: 50,
          ease: 'power3.Out',
          scaleX: 0
        },
        '-=0.7'
      )
      .from(
        button,
        {
          y: 100,
          opacity: 0,
          ease: ' elastic. out( 1, 0.3)',
          scaleY: 0,
          duration: 1
        },
        '-=0.7'
      )

    setTimeout(() => inputField.focus(), 1600)
  }, [])
  return (
    <div className="searchWrapper">
      <div className="logo">
        <svg
          className="leftLogo"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={(el) => (leftIcon = el)}
        >
          <mask
            id="mask0"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="2"
            y="2"
            width="44"
            height="44"
          >
            <path
              d="M29.3789 2.39648L25.2393 15H22.7168L18.5948 2.39648H21.46L23.9737 10.8076L26.4961 2.39648H29.3789Z"
              fill="white"
            />
            <path
              d="M45.6035 29.3788L33 25.2392L33 22.7167L45.6035 18.5947L45.6035 21.4599L37.1924 23.9736L45.6035 26.496L45.6035 29.3788Z"
              fill="white"
            />
            <path
              d="M18.6211 45.6035L22.7607 33L25.2832 33L29.4052 45.6035L26.54 45.6035L24.0263 37.1924L21.5039 45.6035L18.6211 45.6035Z"
              fill="white"
            />
            <path
              d="M2.39648 18.6212L15 22.7608L15 25.2833L2.39648 29.4053L2.39648 26.5401L10.8076 24.0264L2.39648 21.504L2.39648 18.6212Z"
              fill="white"
            />
            <path
              d="M43.0794 12.5274L31.2402 18.5123L29.4566 16.7286L35.4539 4.90186L37.4799 6.92788L33.3098 14.6529L41.041 10.489L43.0794 12.5274Z"
              fill="white"
            />
            <path
              d="M35.4726 43.0794L29.4877 31.2402L31.2714 29.4566L43.0981 35.4539L41.0721 37.4799L33.3471 33.3098L37.511 41.041L35.4726 43.0794Z"
              fill="white"
            />
            <path
              d="M4.92054 35.4726L16.7597 29.4877L18.5434 31.2714L12.5461 43.0981L10.5201 41.0721L14.6902 33.3471L6.959 37.511L4.92054 35.4726Z"
              fill="white"
            />
            <path
              d="M12.5275 4.92056L18.5124 16.7598L16.7287 18.5434L4.90193 12.5461L6.92796 10.5201L14.653 14.6902L10.489 6.95901L12.5275 4.92056Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0)">
            <circle cx="24" cy="24" r="21.6667" fill="white" />
          </g>
        </svg>
        <svg
          onClick={getCordinates}
          className="rightLogo"
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={(el) => (rightIcon = el)}
        >
          <circle cx="21" cy="21" r="21" fill="black" fillOpacity="0.1" />
          <path
            d="M20.8461 34.0003C20.7331 34.0003 20.6213 33.9777 20.5171 33.9338C20.413 33.8899 20.3187 33.8256 20.2398 33.7447C20.1609 33.6637 20.0991 33.5678 20.0579 33.4626C20.0167 33.3573 19.997 33.2449 20 33.1319V23.43C20 23.3178 19.9554 23.2101 19.8761 23.1308C19.7967 23.0514 19.6891 23.0069 19.5769 23.0069H9.86753C9.68955 23.009 9.51529 22.956 9.36862 22.8551C9.22196 22.7543 9.11007 22.6106 9.04832 22.4436C8.978 22.2446 8.98463 22.0264 9.06692 21.832C9.14922 21.6375 9.30122 21.4809 9.49309 21.3928L29.8013 12.0769C29.9582 12.005 30.1334 11.9828 30.3033 12.0133C30.4731 12.0438 30.6296 12.1255 30.7517 12.2474C30.8739 12.3694 30.9558 12.5257 30.9865 12.6956C31.0172 12.8654 30.9953 13.0406 30.9236 13.1976L21.6156 33.5058C21.5482 33.6533 21.4399 33.7783 21.3035 33.866C21.167 33.9537 21.0083 34.0003 20.8461 34.0003Z"
            fill="white"
          />
        </svg>
      </div>
      <main>
        <div className="relative">
          <input
            className="inputCity"
            type="text"
            onChange={handleChange}
            placeholder="Sök på tex.. Gothenburg 😍"
            ref={(el) => (inputField = el)}
            required
          />
          <div className="clickHere" id="clickMe" />
        </div>
        <div id="gpsMessage"></div>
        <div className="btn">
          <button ref={(el) => (button = el)} onClick={fetchWeather}>
            <span>VAD ÄR DET FÖR VÄDER ?</span>
          </button>
          <div className="lottie" id="svg" />
        </div>
      </main>
    </div>
  )
}

export default Search
