import React from 'react'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import {Landing,Error,Register, ProtectedRoute} from './pages'
import {Profile, AddJob, AllJobs, Stats, SharedLayout} from "./pages/dashboard/"
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css'
import Login from './pages/login';
import MyJob from './pages/dashboard/viewMyJob';
import JobDetails from './pages/dashboard/jobDetails';
import { createMuiTheme, ThemeProvider } from '@mui/material';
import palette from './theme/palette';
import { useSelector } from 'react-redux';
import JobApplied from './pages/dashboard/job-applied';
import UserProfile from './pages/user/userProfile';
const theme = createMuiTheme({...palette
  // palette:{
  //   primary:{
  //     main:'#c04e0c'
  //   },
  //   secondary:{
  //     main:'#06456a'
  //   }
  // }
})

const App = () => {
  const {user} = useSelector((store)=>store.user)
  return (
   <>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
          }
          >
          {user?.role === "admin" ? (
              <Route index element={<Stats />} />
            ) : (
              <Route index element={<Navigate to="all-jobs" replace />} />
          )}
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob/>}/>
          <Route path="job-details/:id" element={<JobDetails/>}/>
          <Route path="/job-details/:jobId/user-profile/:applicantId" element={<UserProfile />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="my-jobs" element={<MyJob/>}/>
          <Route path="job-applied" element={<JobApplied/>}/>
          
        </Route>
          <Route path="register" element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path="landing" element={<Landing/>}/>
          <Route path="*" element={<Error/>}/>
      </Routes>
        <ToastContainer position='top-center'/>
      </BrowserRouter>
    </ThemeProvider>
   </>
  )
}

export default App