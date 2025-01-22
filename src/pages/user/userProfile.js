import { Grid2 as Grid, Paper, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getApplicantProfile } from "../../features/jobs/jobSlice"

const UserProfile=()=>{
    const {jobId, applicantId} = useParams()
    const {applicant} = useSelector((store)=>store.job);
    const dispatch = useDispatch()

    useEffect(() => {
        if (jobId && applicantId) {
          dispatch(getApplicantProfile({ jobId, applicantId }));
        }
      }, [jobId, applicantId, dispatch]);
    return(
        <>
        <Paper sx={{p:3}}>
            <Grid container spacing={3}>
                <Grid item md={4}>
                    <Typography variant="p" component="p" color="textSecondary">Name</Typography>
                    <Typography variant="body">{applicant?.name}</Typography>
                </Grid>
                <Grid item md={4}>
                <Typography variant="p" component="p" color="textSecondary">Last Name</Typography>
                <Typography variant="body">{applicant?.lastName}</Typography>
                </Grid>
                <Grid item md={4}>
                    <Typography variant="p" component="p" color="textSecondary">Email</Typography>
                    <Typography variant="body">{applicant?.email}</Typography>    
                </Grid>
                <Grid item md={4}>
                    <Typography variant="p" component="p" color="textSecondary">Email</Typography>
                    <Typography variant="body">{applicant?.email}</Typography>    
                </Grid>
            </Grid>
        </Paper>
        </>
    )
}

export default UserProfile