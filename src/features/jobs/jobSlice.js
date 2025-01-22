import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { applicantProfileThunk, createJobThunk, deleteJobThunk, editJobThunk, jobApplicantThunk, jobStatusThunk } from "./jobThunk";

const initialState={
    isLoading:false,
    position:'',
    company:'',
    jobLocation:'',
    jobTypeOptions:['full-time','part-time','remote','intership'],
    jobType:'full-time',
    statusOptions:['active','onHold','closed'],
    status:'active',
    isEditing:false,
    editid:'',
    createdAt:null,
    skills:'',
    salary:0,
    noticePeriod:'05 - 15 days',
    noticePeriodOption:['05 - 15 days','15 - 30 days','30 - 45 days','45 - 60 days','more then 60 days'],
    jobDescription:'',
    isJobApplied:false,
    applicant:[]
};

export const createJob = createAsyncThunk('job/createJob',createJobThunk)

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk)

export const editJob = createAsyncThunk('job/editJob', editJobThunk)

export const jobApplicant = createAsyncThunk('job/applicant',jobApplicantThunk)

export const getApplicantProfile = createAsyncThunk('applicant/profile',applicantProfileThunk)

export const jobStatus = createAsyncThunk('job/status', jobStatusThunk)

const jobSlice=createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange:(state,{payload:{name,value}})=>{    
            state[name]=value
        },
        clearValues:()=>{
            return initialState
        },
        setEditJob:(state,{payload})=>{
            return {...state, isEditing:true, ...payload}
        }
    },
    extraReducers:{
        [createJob.pending]:(state)=>{
            state.isLoading = true
        },
        [createJob.fulfilled]:(state)=>{
            state.isLoading = false;
            toast.success('Job Created Successfully!!!')
        },
        [createJob.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
        },
        [deleteJob.fulfilled]:()=>{
            toast.success('Job Deleted Successfully!!!')
        },
        [deleteJob.rejected]:({payload})=>{
            toast.error(payload)
        },
        [editJob.pending]:(state)=>{
            state.isLoading = true;
        },
        [editJob.fulfilled]:(state)=>{
            state.isLoading = false;
            toast.success('Job Updated!!!')
        },
        [editJob.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
        },
        [jobApplicant.pending]:(state)=>{
            state.isLoading = false;
        },
        [jobApplicant.fulfilled]:(state,{payload})=>{
            state.isLoading = false;
            state.applicant = payload.applicant;
            state.isJobApplied = true
        },
        [jobApplicant.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
        },
        [getApplicantProfile.pending]:(state)=>{
            state.isLoading = false
        },
        [getApplicantProfile.fulfilled]:(state,{payload})=>{
            state.isLoading = false;
            state.applicant = payload
        },
        [jobStatus.pending]:(state)=>{
            state.isLoading=true
        },
        [jobStatus.fulfilled]:(state,{payload})=>{
            state.isLoading=false;
            state.status = payload;
            toast.success('Job Status Updated!!!')
        }
    }
})

export const {handleChange, clearValues, setEditJob, jobOnHold} = jobSlice.actions;

export default jobSlice.reducer