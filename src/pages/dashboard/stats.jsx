import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { showStats } from "../../features/allJobs/allJobsSlice"
import { ChartsContainer, StatsContainer } from "../../components"


const Stats = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(showStats())
  },[])
  return (
    <>
    <StatsContainer/>
    <ChartsContainer/>
    </>
  )
}
export default Stats