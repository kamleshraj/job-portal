import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrapper/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import { clearValues, createJob, handleChange, editJob } from '../../features/jobs/jobSlice';
import moment from 'moment/moment';
import { Button, Stack, TextareaAutosize } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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
    editid,
    createdAt,
    skills,
    salary,
    noticePeriod,
    noticePeriodOption,
    jobDescription,
    isJobApplied
  } = useSelector((store)=>store.job)
  const {user} = useSelector((store)=>store.user)
  const navigate = useNavigate();
  const dateForEditInput = moment(createdAt, 'MMM Do, YYYY').format('YYYY-MM-DD');
  

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!position || !company || !jobLocation || !createdAt){
      toast.error('Please fill out all fields');
      return
    }
    // const createdAt = new Date().toISOString();
    const date = moment(createdAt).format('MMM Do, YYYY');

    
    const loginUser = user.email
    if(isEditing){
      dispatch(
        editJob({
          id:editid,
          job:{
            position,
            company,
            jobLocation,
            jobType,
            status,
            createdAt:date,
            skills,
            salary,
            noticePeriod,
            jobDescription
          }
        })
      )
      return
    }
    dispatch(createJob({
      position:position, 
      company:company, 
      jobLocation:jobLocation, 
      jobType:jobType, 
      status:status,
      createdAt:date,
      createdBy:loginUser,
      skills:skills,
      salary:salary,
      noticePeriod:noticePeriod,
      jobDescription:jobDescription,
      isJobApplied
    }))
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
    <>
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
          <FormRow
          type="text"
          name="skills"
          labelText="Skills"
          value={skills}
          handleChange={handleJobInput}
          />
          <FormRow
          type="number"
          name="salary"
          labelText="Salary"
          value={salary}
          handleChange={handleJobInput}
          />
          <FormRowSelect 
          name="noticePeriod"
          labelText="Notice Period"
          value={noticePeriod}
          handleChange={handleJobInput}
          list={noticePeriodOption}
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
          <FormRow
          type="date"
          name="createdAt"
          labelText="Date"
          value={isEditing?dateForEditInput:createdAt}
          handleChange={handleJobInput}
          />
          <div className='form-row job-des'>
          <label htmlFor='job description' className='form-label'>
            Job Description
          </label>
          <TextareaAutosize 
          name="jobDescription" 
          variant="outlined" 
          minRows={3} 
          placeholder="Enter the job description"
          value={jobDescription}
          onChange={handleJobInput}
          style={{width:'100%'}}
          />
          </div>
          <div className='form-row btn-row'>
          <Stack flexDirection='row' justifyContent='space-between'>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={()=>navigate('/all-jobs')}>
              Back
            </Button>
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
          </Stack>
          </div>
        </div>
      </form>
    </Wrapper>
    </>
  )
}
export default AddJobs