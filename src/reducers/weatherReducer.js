
const initState = {
    weather: [],
}

export const weatherReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_WEATHER':
            return {
                ...state,
                weather: action.payload,
            }
        default:
            return state
    }
}

export const getWeather = state => state.weather
