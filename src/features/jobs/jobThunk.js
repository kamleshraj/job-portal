import authHeader from "../../utils/authHeader";
import customFetch from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../users/userSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async(job,thunkAPI)=>{    
    try {
        const resp = await customFetch.post('/jobs',job,authHeader(thunkAPI))
        thunkAPI.dispatch(clearValues());
        return resp.data
    } catch (error) {
        if(error.response.status ===401){
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const deleteJobThunk =  async(jobId,thunkAPI)=>{
    thunkAPI.dispatch(showLoading());
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`);
        thunkAPI.dispatch(getAllJobs());
        return resp.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const editJobThunk = async({jobId,job},thunkAPI)=>{
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job)
        thunkAPI.dispatch(clearValues());
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}