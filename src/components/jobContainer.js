import React,{useEffect} from 'react';
import Job from './job'
import Wrapper from '../assets/wrapper/jobContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './pageBtnContainer';

const JobContainer = () => {
    const {jobs,isLoading, page, totalJobs, numOfPages, filteredJobs} = useSelector((store)=>store.allJobs);

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllJobs());
    },[dispatch])

    if(isLoading){
        return <Loading center/>
    }

    // if(filteredJobs.length ===0){
    //     return(
    //         <Wrapper>
    //             <h3>No jobs to display...</h3>
    //         </Wrapper>
    //     )
    // }
    const hasJobs = jobs && jobs.length > 0;
    const hasFilteredJobs = filteredJobs && filteredJobs.length > 0;
    const jobsToDisplay = hasFilteredJobs ? filteredJobs : jobs;
  return (
    <Wrapper>
        <h5>{totalJobs} Jobs Found</h5>
        <div className='jobs'>
        {jobsToDisplay.length === 0 ? (
        // No jobs or filtered data available
        <p>{hasFilteredJobs ? "Data not found." : "No jobs found."}</p>
      ) : (
        // Display jobs or filtered jobs
        jobsToDisplay.map((job) => <Job key={job.id} {...job} />)
      )}
        </div>
        {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobContainer