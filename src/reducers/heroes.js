const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_HAS_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(elem => elem.id !== action.payload)
            }
        case 'HEROES_ADD_CHARACTER': 
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        default: return state
    }
}

export default heroes;