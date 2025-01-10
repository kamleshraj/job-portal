import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import moment from "moment";

const initialFiltersState={
    search:'',
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    sortOptions:['latest','oldest','a-z','z-a'],
    filteredJobs:[]
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
        filterJobs: (state) => {
            let filterJobs = [...state.jobs];

            if (state.search) {
                filterJobs = filterJobs.filter((job) =>
                job.position.toLowerCase().includes(state.search.toLowerCase())
              );
            }

            if (state.searchStatus !== 'all') {
                filterJobs = filterJobs.filter(
                (job) => job.status === state.searchStatus
              );
            }

            if (state.searchType !== 'all') {
                filterJobs = filterJobs.filter(
                (job) => job.jobType === state.searchType
              );
            }
            state.filteredJobs = filterJobs;
        }
    },
    extraReducers:{
        [getAllJobs.pending]:(state)=>{
            state.isLoading = true
        },
        [getAllJobs.fulfilled]:(state,{payload})=>{
            state.isLoading = false;
            state.jobs = payload;
            state.numOfPages = payload.numOfPages;
            state.totalJobs = payload.totalJobs
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

            const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthlyCounts = payload.reduce((acc, job) => {
                const date = moment(job.createdAt, "MMM Do, YYYY");
                
                if (!date.isValid()) {
                  console.error("Invalid date format:", job.createdAt);
                  return acc;
                }
              
                // Get the month and year
                const month = date.format("MMM");
              
                // Increment the count for this month
                acc[month] = (acc[month] || 0) + 1;
                return acc;
              }, {});
              
              // Transform into an array for Recharts
              const monthlyApplications = Object.entries(monthlyCounts).map(([month, count]) => ({
                month,
                count,
              })).sort((a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month));
        
              // Update state
              state.monthlyApplications = monthlyApplications;
        },
        [showStats.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
        }
    }
})

export const {showLoading,hideLoading,handleChange, clearFilters, filterJobs} = allJobsSlice.actions
export default allJobsSlice.reducer