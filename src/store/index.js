import { configureStore } from '@reduxjs/toolkit'; 
import heroes from '../components/heroesList/heroesSlice';
import filter from '../components/heroesFilters/filtersSlice';

const stringMiddleWare = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

// const store = createStore( 
//     combineReducers({heroes, filter}), 
//     compose(applyMiddleware(ReduxThunk ,stringMiddleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     );

const store = configureStore({
    reducer: {heroes, filter},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;