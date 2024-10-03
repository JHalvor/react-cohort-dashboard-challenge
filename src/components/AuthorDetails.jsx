import { useEffect, useState } from 'react';
import { useUser } from "../contexts/UserContext"
import { Link } from 'react-router-dom'

export default function AuthorDetails({ contactId }) {
    const { loggedInUser, contacts } = useUser()
    const [author, setAuthor] = useState({})

    useEffect(() => {
        setAuthor(contacts.find(contact => contact.id == contactId))
    }, [contactId])

    if (!author) return <div>Loading...</div>;

    return (
        <div className="author-details">
            <Link to={`/profile/${author.id}`}>
                <div className="circle">
                    <span>{loggedInUser.initials}</span>
                </div>
                <h4>{author.firstName} {author.lastName}</h4>
            </Link>
        </div>
    )
} 