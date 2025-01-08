const authHeader=(thunkAPI)=>{
    return{
        headers:{Authorization: `Bearer ${thunkAPI.getState().user.token}`}
    }
}

export default authHeader