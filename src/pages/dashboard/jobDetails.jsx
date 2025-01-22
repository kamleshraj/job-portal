import { Button, Grid2 as Grid, Paper, Stack, TextareaAutosize, Typography } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import { getJob } from "../../features/allJobs/allJobsSlice";
import styled from "styled-components";
import { toast } from "react-toastify";
import { applyJob, handleChange } from "../../features/users/userSlice";
import { jobApplicant, jobOnHold, jobStatus } from "../../features/jobs/jobSlice";

const ResumeDetails = styled.div`
margin-bottom:30px;
display:flex;
flex-direction:column;
gap:15px
`;

const JobDetails=()=>{
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {job} = useSelector((store)=>store.allJobs)
    const {user,resumeDetails} = useSelector((store)=>store.user)
    let userId = user.id;
    
    useEffect(()=>{
        dispatch(getJob(id))
    },[dispatch,id,job])

    const handleJobInput=(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      dispatch(handleChange({name,value}))
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      if(!resumeDetails){
         toast.error('Enter the resume details');
         return
      }
      const jobApplied = {
         ...job,
         isJobApplied: true,
         resumeDetails,
       };
       dispatch(jobApplicant({id,user,isJobApplied: true}))
       dispatch(applyJob({ id: userId, jobApplied }));
      toast.success('Job applied')
    }
    const handleJobOnHold=(onHold)=>{
      dispatch(jobStatus({id,status:onHold}));
    }
    const handleJobClosed=(closed)=>{
      dispatch(jobStatus({id,status:closed}))
    }
    return(
        <>
        <Typography variant="h4" mt={3}>Job Details</Typography>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid size={8}>
                <Paper bgcolor={'white'} sx={{p:3, my:3}}>
               <Grid container spacing={2}>
                 <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="p" color="textSecondary">Position</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.position}</Typography>
                 </Grid>
                 <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="p" color="textSecondary">Company Name</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.company}</Typography>
                 </Grid>
                 <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="p" color="textSecondary">Job Type</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.jobType}</Typography>
                 </Grid>
                 <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="p" color="textSecondary">Location</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.jobLocation}</Typography>
                 </Grid>
                 {job.skills && <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="p" color="textSecondary">Skills</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.skills}</Typography>
                 </Grid>}
                 {job.salary &&   <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="p" color="textSecondary">Salary Package</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.salary}</Typography>
                 </Grid>}
                {job.noticePeriod && <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="p" color="textSecondary">Notice Period</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.noticePeriod}</Typography>
                 </Grid>}
                 {job.jobDescription &&   <Grid size={{ xs: 12}}>
                    <Typography variant="p" color="textSecondary">Job Description</Typography><br/>
                    <Typography variant="p" fontWeight={'bold'}>{job.jobDescription}</Typography>
                 </Grid>}
                 <Grid size={{xs:12}}>
                  {user.role==='admin'?
                  <Stack flexDirection={'row'} justifyContent={'space-between'} gap={2} sx={{mt:3}}>
                    <Button variant="outlined" color="primary" onClick={()=>navigate('/all-jobs')}>Back</Button>
                    <Stack flexDirection={'row'} justifyContent={'flex-end'} gap={2}>
                        <Button variant="outlined" color="neutral" onClick={()=>navigate('/add-job')}>Edit</Button>
                        
                        <Button variant="outlined" 
                        onClick={() => handleJobOnHold(job.status === 'onHold' ? 'active' : 'onHold')}
                        disabled={job.status === 'closed'}
                        >{job.status === 'onHold' ? 'UnHold Job' : 'Put on Hold'}
                        </Button>

                        <Button variant="outlined" onClick={() => handleJobOnHold(job.status === 'closed' ? 'active' : 'closed')}>{job.status === 'closed' ? 'Open Job' : 'Closed'}</Button>

                     </Stack>
                    </Stack>:
                    <form onSubmit={handleSubmit}>
                    <ResumeDetails>
                    <Typography variant="p" color="textSecondary">Enter the Resume Details</Typography>
                        <TextareaAutosize 
                           name="resumeDetails" 
                           variant="outlined" 
                           minRows={3} 
                           placeholder="Enter the resume details"
                           value={resumeDetails}
                           onChange={handleJobInput}
                        />
                     </ResumeDetails>
                    <Stack flexDirection={'row'} justifyContent={'flex-end'} gap={2}>
                        <Button variant="outlined" color="neutral" onClick={()=>navigate('/all-jobs')}>Cancel</Button>
                        <Button type="submit" variant="outlined" color="primary">Submit Application</Button>
                    </Stack>
                    </form>
                    }
                 </Grid>
               </Grid>
               </Paper>
            </Grid>
           {user.role==='admin' &&<Grid size={4}>
            <Paper bgcolor={'white'} sx={{p:3, my:3, ml:3}}>
                <Typography variant="h6">Check Applicant Profile</Typography>
                {job?.applicant?.map((user)=>{
                  return <li>
                     <Link to={`user-profile/${user.id}`}>{user.name}</Link>
                  </li>
                })}
            </Paper>
            </Grid>} 
        </Grid>
        <Outlet />

        </>
    )
}

export default JobDetails