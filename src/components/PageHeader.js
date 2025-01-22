import { Button, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const PageHeader=()=>{
    const {user} = useSelector((store)=>store.user)
    const navigate = useNavigate()
    return(
        <>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{borderBottom:'1px solid #e9e9e9',pb:2,mb:2}}>
            <Typography variant="h5">All Jobs</Typography>
            {user.role==='admin'? <Button variant="contained" onClick={()=>navigate('/add-job')}>Add Job</Button>:''}
        </Stack>
        </>
    )
}

export default PageHeader