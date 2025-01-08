import React,{useEffect} from 'react';
import Job from './job'
import Wrapper from '../assets/wrapper/jobContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';

const JobContainer = () => {
    const {jobs,isLoading} = useSelector((store)=>store.allJobs);
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllJobs());
    },[])

    if(isLoading){
        return <Loading center/>
    }

    if(jobs.length ===0){
        return(
            <Wrapper>
                <h3>No jobs to display...</h3>
            </Wrapper>
        )
    }
    
  return (
    <Wrapper>
        <h5>{jobs.length} Jobs Found</h5>
        <div className='jobs'>
            {jobs.map((job)=>{
                return <Job key={job.id} {...job}/>
            })}
        </div>
    </Wrapper>
  )
}

export default JobContainer