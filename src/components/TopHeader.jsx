import { useContext } from "react"
import titleHeader from "../assets/title-header.svg"
import { UserContext } from "../App"

export default function TopHeader() {
    const { loggedInUser } = useContext(UserContext)
    const initials = `${loggedInUser.firstName?.charAt(0).toUpperCase()} ${loggedInUser.lastName?.charAt(0).toUpperCase()}`
    
    return(
        <div className="top-header">
            <div className="title-header">
                <img src={titleHeader} alt="Title Header Icon" width="356" height="56"/>
                <h1>Cohort Manager</h1>
            </div>
            <div className="profile-icon">
                <div className="circle">
                    <span>{initials}</span>
                </div>
            </div>
        </div>
    )
}