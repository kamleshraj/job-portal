import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useSelector } from "react-redux";

const NavLinks=({toggleSidebar})=>{
   const {user} = useSelector((store)=>store.user)
    return(
        <div className={`nav-links ${user.role=='admin'?'adminLogin':'jobSeeker'}`}>
            {links.map((link)=>{
                const {text, path, id,icon} = link;
                
                const isDisabled = 
                user.role !== 'admin' && 
                user.role === 'jobseeker' && 
                (text === 'add job' || text === 'stats' || text === 'My Jobs');

                return(
                    <NavLink 
                    to={isDisabled ? '#' : path}
                    className={({ isActive }) =>
                        isDisabled
                          ? 'nav-link disabled'
                          : isActive
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    key={id}
                    onClick={toggleSidebar}
                    >
                        <span className="icon">{icon}</span>
                        {text}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default NavLinks