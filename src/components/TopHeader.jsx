import titleHeader from '../assets/title-header.svg'
import { useUser } from '../contexts/UserContext'

export default function TopHeader() {
    const { loggedInUser } = useUser()
    
    return(
        <div className="top-header">
            <div className="title-header">
                <img src={titleHeader} alt="Title Header Icon" width="356" height="56"/>
                <h1>Cohort Manager</h1>
            </div>
            <div className="profile-icon">
                <div className="circle">
                    <span>{loggedInUser.initials}</span>
                </div>
            </div>
        </div>
    )
}