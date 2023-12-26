import { configureStore } from '@reduxjs/toolkit';
import modalMovie from './slices/modalMovie';
import bookingMovieSlice from './slices/bookingMovieSlice';
import authSlice from './slices/authSlice';


const store = configureStore({
    reducer: {
        modalMovie,
        bookingMovieSlice,
        authSlice,
    }
})

export default store;