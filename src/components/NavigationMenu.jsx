import homeIcon from '../assets/home-icon.svg'
import profileIcon from '../assets/profile-icon.svg'
import { useUser } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

export default function NavigationMenu() {
    const { loggedInUser } = useUser()

    return(
        <div className="navigation-menu">
            <div className="menu-item">
                <Link to={"/"}>
                    <img src={homeIcon} alt="Home Icon" />
                    Home
                </Link>
            </div>
            <div className="menu-item">
                <Link to={`/profile/${loggedInUser.id}`}>
                    <img src={profileIcon} alt="Profile Icon" />
                    Profile
                </Link>
            </div>
        </div>
    )
}