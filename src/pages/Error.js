import React from 'react'
import Wrapper from './Wrapper'
import NotFound_Img from '../assets/images/not-found.svg'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div className='container errorPage'>
        <img src={NotFound_Img} alt='not-found' className='not-found'/>
        <h2>Ohh! Page Not Found</h2>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error