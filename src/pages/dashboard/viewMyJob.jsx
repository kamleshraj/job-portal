import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllJobs } from "../../features/allJobs/allJobsSlice"
import Wrapper from "../../assets/wrapper/jobContainer"
import Job from "../../components/job"

const ViewMyJob=()=>{
    const dispatch = useDispatch()
    const {jobs} = useSelector((store)=>store.allJobs)
    const {user} = useSelector((store)=>store.user)
    // Function to filter jobs by createdBy
    const filterJobsByCreatedBy = (jobs, loggedInUser) => {
        return jobs.filter((job) => job.createdBy === loggedInUser);
    };
    const loggedInUser = user.email;
    const filteredJobsByUser = filterJobsByCreatedBy(jobs, loggedInUser);
    
    useEffect(()=>{
        dispatch(getAllJobs())
    },[])
    
    return(
    <Wrapper>
        <h5>{filteredJobsByUser.length} Jobs Found</h5>
        <div className='jobs'>
        {filteredJobsByUser.length > 0 ? filteredJobsByUser.map((job) => <Job key={job.id} {...job} />):('Filtered data not found')}
        </div>
    </Wrapper>
    )
}

export default ViewMyJob