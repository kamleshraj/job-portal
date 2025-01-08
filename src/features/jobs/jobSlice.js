import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

const initialState={
    isLoading:false,
    position:'',
    company:'',
    jobLocation:'',
    jobTypeOptions:['full-time','part-time','remote','intership'],
    jobType:'full-time',
    statusOptions:['interview','declined','pending'],
    status:'pending',
    isEditing:false,
    editJobId:'',
    createdAt:''
};

export const createJob = createAsyncThunk('job/createJob',createJobThunk)

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk)

export const editJob = createAsyncThunk('job/editJob', editJobThunk)
 
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
        [deleteJob.fulfilled]:(state,{payload})=>{
            toast.success('Job Deleted Successfully!!!')
        },
        [deleteJob.rejected]:(state,{payload})=>{
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
        }
    }
})

export const {handleChange, clearValues, setEditJob} = jobSlice.actions;

export default jobSlice.reducer