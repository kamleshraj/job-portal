import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow';
import Wrapper from '../../assets/wrapper/DashboardFormPage';
import { useEffect } from 'react';
import { updateUser } from '../../features/users/userSlice';

const Profile = () => {
  const{isLoading, user} = useSelector((store)=>store.user);
  
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    lastName: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        lastName: user.lastName || '',
        location: user.location || '',
      });
    }
  }, [user]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const{name,email,lastName,location} = userData
    if(!name || !email||!lastName || !location){
      toast.error('Please fill out all fields');
      return
    }
    dispatch(updateUser({name,email,lastName,location}))
  }
  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setUserData({...userData,[name]:value})
  }
  return (
   <Wrapper>
    <form className='form' onSubmit={handleSubmit}>
      <h3>Profile</h3>
      <div className='form-center'>
        <FormRow
        type="text"
        name="name"
        labelText="Name"
        value={userData.name}
        handleChange={handleChange}
        />
        <FormRow
        type="text"
        name="lastName"
        labelText="Last Name"
        value={userData.lastName}
        handleChange={handleChange}
        />
        <FormRow
        type="email"
        name="email"
        labelText="Email"
        value={userData.email}
        handleChange={handleChange}
        />
        <FormRow
        type="text"
        name="location"
        labelText="Location"
        value={userData.location}
        handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>{isLoading?'Please wait....':'Save Changes'}</button>
      </div>
    </form>
   </Wrapper>
  )
}
export default Profile