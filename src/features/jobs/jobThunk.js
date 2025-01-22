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

export const deleteJobThunk =  async(id,thunkAPI)=>{
    thunkAPI.dispatch(showLoading());
    try {
        const resp = await customFetch.delete(`/jobs/${id}`);
        thunkAPI.dispatch(getAllJobs());
        return resp.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const editJobThunk = async({id,job},thunkAPI)=>{
    try {
        const resp = await customFetch.patch(`/jobs/${id}`, job)
        thunkAPI.dispatch(clearValues());
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const jobApplicantThunk = async({id,user},thunkAPI)=>{
    try {
        const jobResponse = await customFetch.get(`/jobs/${id}`);
        const currentApplicants = jobResponse.data.applicant || [];
        const updatedApplicant = [...currentApplicants, user];
        const resp = await customFetch.patch(`/jobs/${id}`, {
            applicant: updatedApplicant,
          });
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const applicantProfileThunk = async({jobId,applicantId},thunkAPI)=>{
    try {
    // Fetch job details
    const response = await customFetch.get(`/jobs/${jobId}`);
    
    // Find the specific applicant
    const applicant = response.data.applicant.find(a => a.id === applicantId);

    if (!applicant) {
      console.error('Applicant not found');
      return null;
    }
    return applicant;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const jobStatusThunk = async({id,status},thunkAPI)=>{
    console.log(status)
    try {
        const resp = await customFetch.patch(`/jobs/${id}`, {status})
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}