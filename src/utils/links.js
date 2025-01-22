import { ImProfile } from "react-icons/im";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
const links=[
    {id:1, text:'stats', path:'/', icon:<IoBarChartSharp/>},
    {id:2, text:'all jobs', path:'all-jobs', icon:<MdQueryStats/>},
    // {id:3, text:'add job', path:'add-job', icon:<FaWpforms/>},
    {id:5, text:'profile', path:'profile', icon:<ImProfile/>},
    {id:5, text:'Job Applied', path:'job-applied', icon:<WorkIcon/>},
    {id:5, text:'My Jobs', path:'my-jobs', icon:<PersonIcon/>},
]

export default links