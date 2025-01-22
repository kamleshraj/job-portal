import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState={
  name:'',
  email:'',
  password:'',
  isMember:true
}

const Register = () => {
  const[values,setValues]=useState(initialState);
  const navigate = useNavigate()
  const{isLoading} = useSelector((store)=>store.user)
  const dispatch = useDispatch()
  
  const handleChange=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setValues({...values, [name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const{name,email,password,isMember} = values;
    
    if(!email || !password || (!isMember && !name)){
      toast.error('Please fill out all the fields')
      return;
    }

    if (isMember) {
      dispatch(registerUser({ name, email, password }));
      navigate("/login");
    } 
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo/>
        <h3>Register</h3>
        <FormRow 
         type="text"
         name="name"
         value={values.name}
         handleChange={handleChange}
         labelText="Name"
        />
        <FormRow 
         type="email"
         name="email"
         value={values.email}
         handleChange={handleChange}
         labelText="Email"
        />

        <FormRow 
         type="password"
         name="password"
         value={values.password}
         handleChange={handleChange}
         labelText="Password"
        />
        
        <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading?'Loading...':'Submit'}</button>
        <p>
        {values.isMember ? (
          <>
            Already a member?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="member-btn"
            >
              Login
            </button>
          </>
        ) : (
          <>
            Not a member yet?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="member-btn"
            >
              Register
            </button>
          </>
        )}
      </p>
      </form>
    </Wrapper>
  )
}

export default Register