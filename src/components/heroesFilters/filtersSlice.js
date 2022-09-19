import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

// const initialState = {
//     filters: [], 
//     filterLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

const initialState = filtersAdapter.getInitialState({
    filterLoadingStatus: 'idle',
    activeFilter: 'all'
}) 

export const fetchFilters = createAsyncThunk(
    'filter/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters/")
    }
)

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload
        },
        filtersFetchingError: state => {
            state.filterLoadingStatus = 'error'
        },
        filterChanging: state => {
            state.filterLoadingStatus = 'loading'
        },
        filterAdd: (state, action) => {
            console.log(action.payload)
            state.filters = action.payload
            state.filterLoadingStatus = 'idle';
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filterLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filterLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {
                state.filterLoadingStatus = 'error';
            })
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filter);

export const {
    activeFilterChanged, 
    filtersFetchingError,
    filterChanging,
    filterAdd
} = actions