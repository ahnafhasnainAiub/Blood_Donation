import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch organization data
export const fetchOrganization = createAsyncThunk('fetchOrganization', async () => {
    const response = await fetch("http://localhost:8000/organization");
    const data = await response.json();
    return data.organizations;  
}) 

// Create a slice for organizations
const organizationSlice = createSlice({
    name: "organization",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganization.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchOrganization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchOrganization.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default organizationSlice.reducer;
