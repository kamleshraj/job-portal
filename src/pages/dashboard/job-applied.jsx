import { useSelector } from "react-redux"
import Job from "../../components/job";
import Grid from '@mui/material/Grid2';

const JobApplied=()=>{
    const {user} = useSelector((store)=>store.user)
    if (!user || !user.jobApplied || user.jobApplied.length === 0) {
        return <p>No applied jobs to display.</p>;
    }
    return(
        <>
        <Grid container spacing={2}>
       {user.jobApplied.map((job) =>{
        return <Grid item xs={12} sm={6}>
            <Job key={job.id} {...job} />
        </Grid>
       })}
       </Grid>
        </>
    )
}

export default JobApplied