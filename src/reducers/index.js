const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [], 
    filterLoadingStatus: 'idle',
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
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
        case 'FILTER_CHANGING': 
            return {
                ...state, 
                filterLoadingStatus: 'loading'
            }
        case 'FILTER_ERROR': 
            return {
                ...state, 
                filterLoadingStatus: 'error'
            }
        case 'FILTER_CHANGED': 
            return {
                ...state, 
                filters: action.payload,
                filterLoadingStatus: 'idle'
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
        case 'HEROES_ACTIVE_FILTER': 
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;