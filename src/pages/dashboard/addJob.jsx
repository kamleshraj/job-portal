import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrapper/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import { clearValues, createJob, handleChange, editJob } from '../../features/jobs/jobSlice';
import moment from 'moment/moment';

const AddJobs = () => {
  const dispatch = useDispatch();
  const{
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId
  } = useSelector((store)=>store.job)
  const {user} = useSelector((store)=>store.user)
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!position || !company || !jobLocation){
      toast.error('Please fill out all fields');
      return
    }
    const createdAt = new Date().toISOString();
    const date = moment(createdAt).format('MMM Do, YYYY');
    
    if(isEditing){
      dispatch(
        editJob({
          jobId:editJobId,
          job:{position,company,jobLocation,jobType, status}
        })
      )
      return
    }
    dispatch(createJob({position:position, company:company, jobLocation:jobLocation, jobType:jobType, status:status,createdAt:date}))
  }

  const handleJobInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name,value}))
  }
  useEffect(()=>{
    //dispatch(clearValues())
    if(!isEditing){
      dispatch(
        handleChange({
        name:'jobLocation',
        value:user.location
      })
    );
    }
  },[])
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing?'Edit Job':'Add Job'}</h3>
        <div className='form-center'>
          <FormRow
          type="text"
          name="position"
          value={position}
          labelText="Position"
          handleChange={handleJobInput}
          />
          <FormRow
          type="text"
          name="company"
          value={company}
          labelText="Company"
          handleChange={handleJobInput}
          />
          <FormRow
          type="text"
          name="jobLocation"
          labelText="Job Location"
          value={jobLocation}
          handleChange={handleJobInput}
          />
          <FormRowSelect 
          name="jobType"
          labelText="Job Type"
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
          />
          <FormRowSelect 
          name="status"
          labelText="Status"
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
          />
          <div className='btn-container'>
            <button type="button" className='btn btn-block clear-btn' onClick={()=>dispatch(clearValues())}>
              Clear
            </button>
            <button 
            type="button" 
            className='btn btn-block submit-btn' 
            onClick={handleSubmit}
            disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJobs