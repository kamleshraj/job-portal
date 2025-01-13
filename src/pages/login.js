import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState={
    email:'',
    password:'',
    isMember:true
  }

const Login=()=>{
    const[values,setValues]=useState(initialState);
      const navigate = useNavigate()
      const{user,isLoading} = useSelector((store)=>store.user)
      const dispatch = useDispatch()
      
      const handleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setValues({...values, [name]:value})
      }
    
      const handleSubmit=(e)=>{
        e.preventDefault()
        const{email,password,isMember} = values;
        if(!email || !password){
          toast.error('Please fill out all the fields')
          return;
        }
        if (isMember) {
          dispatch(loginUser({ email, password }));
        }
      }
      useEffect(() => {
        if (user) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        setValues({ ...values, isMember: true });
      }, [user,navigate]);
    return(
        <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo/>
        <h3>Login</h3>
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
        {!values.isMember ? (
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

export default Login