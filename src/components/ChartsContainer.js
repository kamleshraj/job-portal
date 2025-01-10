import React, { useState } from 'react'
import Wrapper from'../assets/wrapper/chartsContainer';
import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';
import { useSelector } from 'react-redux';

const ChartsContainer = () => {
   const {monthlyApplications} = useSelector((store)=>store.allJobs);
   console.log(monthlyApplications);
   
  const[barChart,setBarChart] = useState(true)
  return (
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' onClick={()=>setBarChart(!barChart)}>{barChart?'Area Chart' : 'Bar Chart'}
        </button>
        {barChart? <AreaChartComponent data={monthlyApplications}/>:<BarChartComponent data={monthlyApplications}/>}
        
    </Wrapper>
  )
}

export default ChartsContainer