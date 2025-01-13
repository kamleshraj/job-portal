import React,{useEffect} from 'react';
import Job from './job'
import Wrapper from '../assets/wrapper/jobContainer';
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './pageBtnContainer';
import Skeleton from 'react-loading-skeleton';

const JobContainer = () => {
    const {jobs, isLoading, totalJobs, numOfPages, filteredJobs} = useSelector((store)=>store.allJobs);

    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getAllJobs());
    }, [dispatch]);
    
    if (isLoading) {
        return (
          <Wrapper>
            <h5>Loading Jobs...</h5>
            <div className="jobs">
              {Array.from({ length: jobs?.length || 5 }).map((_, index) => (
              <div key={index} className="job-skeleton">
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                  <Skeleton height={40} width={50} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={20} width="60%" />
                  </div>
                </div>
                <Skeleton height={20} width="90%" />
                <Skeleton height={20} width="90%" />
                <Skeleton height={20} width="90%" />
              </div>
              ))}
            </div>
          </Wrapper>
        );
      }

    if(jobs.length ===0){
      return(
          <Wrapper>
              <h3>No data to display...</h3>
          </Wrapper>
      )
  }
  return (
    <Wrapper>
        <h5>{totalJobs} Jobs Found</h5>
        <div className='jobs'>

        {filteredJobs.length > 0 ? filteredJobs.map((job) => <Job key={job.id} {...job} />):('Filtered data not found')}
        </div>
        {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobContainer