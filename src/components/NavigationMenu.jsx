import homeIcon from "../assets/home-icon.svg"
import profileIcon from "../assets/profile-icon.svg"

export default function NavigationMenu() {
    return(
        <div className="navigation-menu">
            <div className="menu-item">
                <img src={homeIcon} alt="Home Icon" />
                Home
            </div>
            <div className="menu-item">
                <img src={profileIcon} alt="Profile Icon" />
                Profile
            </div>
        </div>
    )
}