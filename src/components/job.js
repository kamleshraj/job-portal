import React from 'react'
import { FaLocationArrow,FaBriefcase,FaCalendarAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Wrapper from '../assets/wrapper/jobCard';
import { useDispatch, useSelector } from 'react-redux';
import JobInfo from './jobInfo';
import { deleteJob, setEditJob } from '../features/jobs/jobSlice';

const Job = ({
  id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
  isJobApplied
}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((store)=>store.user)
  
  const deleteHandler=(id)=>{
    dispatch(deleteJob(id))
  }
  return (
    <Wrapper>
      <Link to={`/job-details/${id}`}>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      </Link>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
          <JobInfo icon={<FaCalendarAlt/>} text={createdAt}/>
          <JobInfo icon={<FaBriefcase/>} text={jobType}/>
          <div className={`status ${status}`}>{status}</div>
        </div>
       {user?.role==='admin'?
       (<footer>
          <div className='actions'>
            <Link 
            to="/add-job"
            className='btn edit-btn'
            onClick={()=>{
              dispatch(setEditJob({editid:id,position,company,jobLocation,jobType,status,createdAt}))
            }}
            >
              Edit {' '}
            </Link>
            <button
            type='button'
            className='btn delete-btn'
            onClick={()=>deleteHandler(id)}
            >
              Delete
            </button>
          </div>
        </footer>)
        : <Link 
        to={`/job-details/${id}`}
        className='btn edit-btn'
        >
          {isJobApplied?'Applied':'Apply Job'}
        </Link>}
      </div>
     
    </Wrapper>
  )
}

export default Job