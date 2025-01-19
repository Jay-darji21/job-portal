import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        adminJob : [],
        singleJob : null,
        searchJobByText : "",
        allAppliedJobs:[],
        searchedQuery : ""
    },
    reducers:{
        // actions
        setAllJobs : (state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob : (state,action) => {
            state.singleJob = action.payload;
        },
        setAdminJob : (state,action) => {
            state.adminJob = action.payload;
        },
        setSearchJobByText : (state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery : (state,action) => {
            state.searchedQuery = action.payload;
        }
    }
})

export const {setAllJobs,setSingleJob, setAdminJob, setSearchJobByText, setAllAppliedJobs, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;