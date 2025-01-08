import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from './Wrapper'
import {Logo} from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
   <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className='container banner'>
        <div className='info'>
          <h1>Job <span>Tracking</span> App</h1>
          <p>lWe believe that the fast paced changes, economic fluctuations, and the many uncontrollable variables that we have been experiencing affect the organizations' strategies and plans. That is why we are interested in delivering high quality, up-to-date market insights in which you can rely on when making important business decisions during these critical times.</p>
          <Link className='btn btn-hero' to='/register'>Login/Register</Link>
        </div>
        <img src={main} alt='main-banner' className='main-banner'/>
      </div>
   </Wrapper>
  )
}

export default Landing