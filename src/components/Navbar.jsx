import { FaAlignLeft, FaCaretDown, FaHome, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import Wrapper from "../assets/wrapper/navbar";
import { logoutUser, toggleSidebar } from "../features/users/userSlice";
import { useState } from "react";

const Navbar=()=>{
    const [showLogout,setShowLogout] = useState(false);
    const {user} = useSelector((store)=>store.user)
    const dispatch = useDispatch()
    
    const toggle=()=>{
        dispatch(toggleSidebar())
    }
    return(
        <Wrapper>
           <div className="nav-center">
            <button type="button" className="toggle-btn" onClick={toggle}>
                <FaAlignLeft/>
            </button>
            <div>
                <Logo/>
                <h3 className="logo-text">Dasbboard</h3>
            </div>
            <div className="btn-container">
                <button type="button" className="btn"
                onClick={()=>setShowLogout(!showLogout)}
                >
                    <FaUserCircle/>
                    {user?.name}
                    <FaCaretDown/>
                </button>
                <div className={showLogout?"dropdown show-dropdown":"dropdown"}>
                    <button type="button" className='dropdown-btn'
                    onClick={()=>{dispatch(logoutUser())}}
                    >Logout</button>
                </div>
            </div>
           </div>
        </Wrapper>
    )
}

export default Navbar