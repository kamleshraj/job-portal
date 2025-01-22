import React from 'react'
import StatsItem from './statsItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrapper/statsContainer';

const StatsContainer = () => {
    const { stats } = useSelector((store) => store.allJobs);
    const defaultStats = [
        {
          title: 'Active Applications',
          count: stats.active || 0,
          icon: <FaSuitcaseRolling />,
          color: '#e9b949',
          bcg: '#fcefc7',
        },
        {
          title: 'On Hold',
          count: stats.onHold || 0,
          icon: <FaCalendarCheck />,
          color: '#647acb',
          bcg: '#e0e8f9',
        },
        {
          title: 'Closed',
          count: stats.closed || 0,
          icon: <FaBug />,
          color: '#d66a6a',
          bcg: '#ffeeee',
        },
      ];
  return (
    <Wrapper>
     {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />;
      })}
    </Wrapper>
  )
}

export default StatsContainer