import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDonor = createAsyncThunk('fetchDonor', async () => {
    const response = await fetch("http://localhost:8000/donor");
    const data = await response.json();
    return data.donors;  // Ensure you're returning the correct array of donors from the API
}) 

const donorSlice = createSlice({
    name: "donor",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDonor.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchDonor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchDonor.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default donorSlice.reducer;
