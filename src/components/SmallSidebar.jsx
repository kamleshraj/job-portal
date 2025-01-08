import { FaTimes } from "react-icons/fa"
import Wrapper from "../assets/wrapper/smallSidebar"
import { toggleSidebar } from "../features/users/userSlice"
import Logo from "./Logo"
import { useDispatch, useSelector } from "react-redux"
import NavLinks from "./NavLinks"

const SmallSidebar=()=>{
    const {isSidebarOpen} = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const toggle =()=>{
        dispatch(toggleSidebar())
    }
    return(
        <Wrapper>
            <div className={isSidebarOpen?"sidebar-container show-sidebar":"sidebar-container"}>
                <div className="content">
                    <button className="close-btn" onClick={toggle}>
                        <FaTimes/>
                    </button>
                    <header>
                        <Logo/>
                    </header>
                    <NavLinks toggleSidebar={toggle}/>
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar