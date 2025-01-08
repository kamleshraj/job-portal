import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState={
    search:'',
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    sortOptions:['latest','oldest','a-z','z-a']
}

const initialState={
    isLoading:true,
    jobs:[],
    totalJobs:0,
    numOfPages:1,
    page:1,
    stats:{},
    monthlyApplications:[],
    ...initialFiltersState
};

export const showStats = createAsyncThunk('allStats/showStats', async(_, thunkAPI)=>{
    try {
        const resp = await customFetch.get('/jobs')
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const getAllJobs = createAsyncThunk('allJobs/getJobs', async(_, thunkAPI)=>{
   try {
    const resp = await customFetch.get('/jobs')
    return resp.data
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
   }
})

const allJobsSlice = createSlice({
    name:'allJobs',
    initialState,
    reducers:{
        showLoading:(state)=>{
            state.isLoading = true
        },
        hideLoading:(state)=>{
            state.isLoading = false
        },
        handleChange:(state, {payload:{name,value}})=>{
            state[name]=value;
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState };
        },
    },
    extraReducers:{
        [getAllJobs.pending]:(state)=>{
            state.isLoading = true
        },
        [getAllJobs.fulfilled]:(state,{payload})=>{
            state.isLoading = false;
            state.jobs = payload
        },
        [getAllJobs.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
        },
        [showStats.pending]:(state)=>{
            state.isLoading = true
        },
        [showStats.fulfilled]:(state,{payload})=>{
            state.isLoading = false;
            const statusCount = payload.reduce((acc, job) => {
                const { status } = job;
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});
            state.stats = statusCount;

            // Calculate monthly job counts
            const monthlyCounts = payload.reduce((acc, job) => {
                const date = new Date(job.createdAt);
                const month = date.toLocaleString("default", { month: "short" });
                const year = date.getFullYear();
                const key = `${month} ${year}`;

                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});

    // Transform into an array for Recharts
    const monthlyApplications = Object.entries(monthlyCounts).map(([month, count]) => ({
        month,
        count,
    }));
    console.log(monthlyApplications);
    
    // Update state
    //state.monthlyApplications = monthlyApplications;
        },
        [showStats.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
        }
    }
})

export const {showLoading,hideLoading,handleChange, clearFilter} = allJobsSlice.actions
export default allJobsSlice.reducer