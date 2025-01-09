import { useSelector } from "react-redux"

const PageBtnContainer=()=>{
    const data = useSelector((store)=>store.allJobs)
    
    return(
        <>
        Button Container
        </>
    )
}

export default PageBtnContainer