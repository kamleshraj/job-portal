import React from 'react'
import Wrapper from '../assets/wrapper/jobInfo'
const JobInfo = ({icon,text}) => {
  return (
    <Wrapper>
        <span className='icon'>{icon}</span>
        <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default JobInfo