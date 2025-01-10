import React,{useEffect} from 'react';
import Job from './job'
import Wrapper from '../assets/wrapper/jobContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './pageBtnContainer';

const JobContainer = () => {
    const {jobs,isLoading, search, searchStatus, searchType, totalJobs, numOfPages, filteredJobs} = useSelector((store)=>store.allJobs);

    const dispatch = useDispatch()
    console.log('jobs', jobs)
    console.log('filtered', filteredJobs)
    useEffect(()=>{
        dispatch(getAllJobs());
    }, [dispatch]);

    if(isLoading){
        return <Loading center/>
    }

    // if(filteredJobs.length ===0){
    //     return(
    //         <Wrapper>
    //             <h3>Searched item not available</h3>
    //         </Wrapper>
    //     )
    // }
    if(jobs.length ===0){
      return(
          <Wrapper>
              <h3>No data to display...</h3>
          </Wrapper>
      )
  }
    const hasJobs = jobs && jobs.length > 0;
    const hasFilteredJobs = filteredJobs && filteredJobs.length > 0;
  return (
    <Wrapper>
        <h5>{totalJobs} Jobs Found</h5>
        <div className='jobs'>

        {filteredJobs.length > 0 ? filteredJobs.map((job) => <Job key={job.id} {...job} />):('Search data not found')}
        </div>
        {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobContainer