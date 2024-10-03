import { useEffect, useState } from 'react';
import { useUser } from "../context/UserContext"
import { Link } from 'react-router-dom'

export default function AuthorDetails({ contactId }) {
    const { loggedInUser, contacts } = useUser()
    const initials = `${loggedInUser.firstName?.charAt(0).toUpperCase()} ${loggedInUser.lastName?.charAt(0).toUpperCase()}`
    const [author, setAuthor] = useState({})

    useEffect(() => {
        setAuthor(contacts.find(contact => contact.id == contactId))
    }, [contactId])

    if (!author) return <div>Loading...</div>;

    return (
        <div className="author-details">
            <Link to={`/profile/${author.id}`}>
                <div className="circle">
                    <span>{initials}</span>
                </div>
                <h4>{author.firstName} {author.lastName}</h4>
            </Link>
        </div>
    )
} 