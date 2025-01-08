import React from 'react'
import { FaLocationArrow,FaBriefcase,FaCalendarAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Wrapper from '../assets/wrapper/jobCard';
import { useDispatch } from 'react-redux';
import JobInfo from './jobInfo';
import { deleteJob, setEditJob } from '../features/jobs/jobSlice';

const Job = ({
  id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status
}) => {
  const dispatch = useDispatch();
  const date = createdAt;
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
          <JobInfo icon={<FaCalendarAlt/>} text={date}/>
          <JobInfo icon={<FaBriefcase/>} text={jobType}/>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link 
            to="/add-job"
            className='btn edit-btn'
            onClick={()=>{
              dispatch(setEditJob({editJobId:id,position,company,jobLocation,jobType,status}))
            }}
            >
              Edit {' '}
            </Link>
            <button
            type='button'
            className='btn delete-btn'
            onClick={()=>dispatch(deleteJob(id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job