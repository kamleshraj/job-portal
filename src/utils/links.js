import { FaVimeoSquare, FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";

const links=[
    {id:1, text:'stats', path:'/', icon:<IoBarChartSharp/>},
    {id:2, text:'all jobs', path:'all-jobs', icon:<MdQueryStats/>},
    {id:3, text:'add job', path:'add-job', icon:<FaWpforms/>},
    {id:4, text:'profile', path:'profile', icon:<ImProfile/>},
    {id:5, text:'my jobs', path:'view-my-job', icon:<FaVimeoSquare/>},
]

export default links