import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

const initialState={
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk('user/registerUser', async(user,thunkAPI)=>{
    try {
        // Fetch all users to check for duplicate email
      const usersResponse = await customFetch.get('/users');
      const users = usersResponse.data;
      // Check if email already exists
      const isEmailTaken = users.some((u) => u.email === user.email);
      if (isEmailTaken) {
        return thunkAPI.rejectWithValue('Email already exists');
      }
        // If email is unique, proceed with registration
        const response = await customFetch.post('/users', user)
        const token = `mock-token-${response.data.id}`;
        return { ...response.data, token };
    } catch (error) {
       return thunkAPI.rejectWithValue(error.response.data.msg || 'Something went wrong')
    }
})

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
      try {
        const response = await customFetch.get('/users');
        const users = response.data;
  
        // Check if email and password match any user
        const matchedUser = users.find(
          (u) => u.email === user.email && u.password === user.password
        );
  
        if (!matchedUser) {
          return thunkAPI.rejectWithValue('Invalid email or password');
        }
        return matchedUser;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.msg || 'Something went wrong'
        );
      }
    }
  );

export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {
    const {id} = user
    try {
      const resp = await customFetch.patch(`/users/${id}`, user);
      return resp.data;
    } catch (error) {
        if(error.response.status===401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue('Unauthrized! logging out...')
        }
      return thunkAPI.rejectWithValue(error.response?.data?.msg);
    }
  });
  


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser:(state)=>{
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage()
        }
    },
    extraReducers:{
        [registerUser.pending]:(state)=>{
            state.isLoading=true
        },
        [registerUser.fulfilled]:(state,{payload})=>{ 
            state.isLoading=false
            state.user = null;
            state.user = payload;
            addUserToLocalStorage(payload)
            toast.success(`Registration successful`)
        },
        [registerUser.rejected]:(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload)
        },
        [loginUser.pending]:(state)=>{
            state.isLoading=true
        },
        [loginUser.fulfilled]:(state,{payload})=>{
            state.isLoading=false
            state.user = payload;
            addUserToLocalStorage(payload)
            toast.success(`Welcome Back, ${payload.name || 'User'}`);
        },
        [loginUser.rejected]:(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload)
        },
        [updateUser.pending]:(state)=>{
            state.isLoading=true
        },
        [updateUser.fulfilled]:(state,{payload})=>{
            state.isLoading=false
            state.user = payload;
            addUserToLocalStorage(payload)
            toast.success(`User Updated!`)
        },
        [updateUser.rejected]:(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload)
        }
    }
});

export const {toggleSidebar, logoutUser} = userSlice.actions
export default userSlice.reducer