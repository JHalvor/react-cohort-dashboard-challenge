import titleHeader from '../assets/title-header.svg'
import { useUser } from '../contexts/UserContext'
import Circle from './InitialsCircle'

export default function TopHeader() {
    const { loggedInUser } = useUser()
    
    return(
        <div className="top-header">
            <div className="title-header">
                <img src={titleHeader} alt="Title Header Icon" width="356" height="56"/>
            </div>
            <div className="profile-icon">
                <Circle color={loggedInUser.favouriteColour}/>
            </div>
        </div>
    )
}