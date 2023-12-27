import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie : null,
    isOpen : false,
}

const modalMovieSlice = createSlice({
    name: "modalMovie",
    initialState,
    reducers: {
        openModal : (state,action) => {
            return {...state , isOpen: true ,movie: action.payload}
        },

        onCloseModal : (state,action) => {
            return {...state, isOpen: false}
        },
    }
})

export const { openModal, onCloseModal } = modalMovieSlice.actions
export default modalMovieSlice.reducer;