import { Link } from 'react-router-dom'
import './Navbar.scss'
import searchIcon from '../assets/searchIcon.svg'
import { useHistory } from 'react-router-dom'
function Navbar() {
  const history = useHistory()
  return (
    <nav className="navBar">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="navSnowflake"
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

      <img
        src={searchIcon}
        alt="search icon"
        className="searchIcon"
        onClick={() => history.push('/search')}
      />
    </nav>
  )
}

export default Navbar
