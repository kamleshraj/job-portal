import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import moment from "moment";
import { monthsOrder } from "../../utils/constants";

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
    myJobs:[],
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
    const resp = await customFetch.get(`/jobs`)
    //const resp = await customFetch.get(`/jobs?_page=${page}&_limit=${limit}`)
    return resp.data;
    // const totalJobs = resp.headers.get("X-Total-Count");
    // const numOfPages = Math.ceil(totalJobs / limit);
    // console.log(numOfPages)
    // return {
    //     jobs: data,
    //     totalJobs: Number(totalJobs),
    //     numOfPages,
    // };
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || "Something went wrong")
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
        },
        viewMyJob:(state)=>{

        }
    },
    extraReducers:{
        [getAllJobs.pending]:(state)=>{
            state.isLoading = true
        },
        [getAllJobs.fulfilled]:(state,{payload})=>{
            state.isLoading = false;
            state.jobs = payload;
            state.filteredJobs = payload;
            state.totalJobs = payload.totalJobs;
            state.numOfPages = payload.numOfPages;
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

            
            const monthlyCounts = payload.reduce((acc, job) => {
                const date = moment(job.createdAt, "MMM Do, YYYY");

                if (!date.isValid()) {
                  console.error("Invalid date format:", job.createdAt);
                  return acc;
                }
                const month = date.format("MMM");
                acc[month] = (acc[month] || 0) + 1;
                return acc;
              }, {});
              
              // Transform into an array for Recharts
              const monthlyApplications = Object.entries(monthlyCounts).map(([month, count]) => ({
                month,
                count,
              })).sort((a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month));
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