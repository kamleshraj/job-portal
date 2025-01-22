import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import CustomTab from '../../components/CustomTab';
import JobContainer from '../../components/jobContainer';
import SearchContainer from "../../components/SearchContainer"
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../features/allJobs/allJobsSlice';
const tabs = [
  {
    label: "Active Job",
    Component: (
      <>
        <Typography variant='h5'>Active Jobs</Typography>
        <SearchContainer/>
        <JobContainer status="active" />
      </>
    )
  },
  {
    label: "On Hold Job",
    Component: (
      <>
        <Typography variant='h5'>On Hold Jobs</Typography>
        <SearchContainer/>
        <JobContainer status="onHold" />
      </>
    )
  },
  {
    label: "Closed Job",
    Component: (
      <>
        <Typography variant='h5'>Closed Jobs</Typography>
        <SearchContainer/>
        <JobContainer status="closed" />
      </>
    )
  }
];
const AllJob = () => {
  const {user} =useSelector((store)=>store.user)
  return (
    <>
    <PageHeader/>
    {user.role==='admin'?
    <CustomTab tabs={tabs}/>
    :
    <JobContainer status="active" />
    }
    </>
  )
}
export default AllJob