import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingMovieAPI from "../services/bookingMovieAPI";

const initialState = {
    infoMovie : null,
    loading: false,
    error: null,
    selectedSeat : [],
    totalCost : 0,
}

export const listBooking = createAsyncThunk(
    "bookingMovie",
    async (maLichChieu) => {
        const data = await bookingMovieAPI.getListBooking(maLichChieu);
        return data;
    }
)


const bookingMovieSlice = createSlice({
    name: "bookingMovie",
    initialState,
    reducers: {
        addSeat: (state,action) => {
            return {...state, selectedSeat : [...state.selectedSeat, action.payload] }
        },

        deleteSeat: (state,action) => {
            const selectedSeat = state.selectedSeat.filter(item => item.maGhe !== action.payload.maGhe)
            return {...state,selectedSeat}
        },

        reloadBooking: (state,action) => {
            return {...state, selectedSeat: [], totalCost: 0}
        },

        calcTotal: (state,action) => {
            const total = state.selectedSeat.reduce((total, item) => {
                return total += item.giaVe;
            },0)
            
            return {...state, totalCost: total}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listBooking.pending, (state,action) => {
            return {...state, loading: true}
        });

        builder.addCase(listBooking.fulfilled, (state,action) => {
            return {...state, loading: false, infoMovie: action.payload}
        });

        builder.addCase(listBooking.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message}
        })
    }
})

export const { addSeat, deleteSeat, reloadBooking, calcTotal } = bookingMovieSlice.actions;
export default bookingMovieSlice.reducer;