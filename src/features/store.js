import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";
import jobSlice from './jobs/jobSlice';
import allJobsSlice from './allJobs/allJobsSlice'
const store = configureStore({
    reducer:{
        user:userSlice,
        job:jobSlice,
        allJobs: allJobsSlice
    }
})

export default store