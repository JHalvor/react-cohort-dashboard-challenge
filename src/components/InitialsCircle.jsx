import { useUser } from '../contexts/UserContext'

export default function Circle({color}) {
    const { loggedInUser } = useUser()
    return(
        <div 
            className="circle" 
            style={{width:"50px", height:"50px", borderRadius:"50%", backgroundColor:color, display:"flex", justifyContent:"center", alignItems:"center"}}>
            <span>{loggedInUser.initials}</span>
        </div>
    )
}