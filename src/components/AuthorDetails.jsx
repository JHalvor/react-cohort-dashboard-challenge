import { useEffect, useState } from 'react';
import { useUser } from "../contexts/UserContext"
import { Link } from 'react-router-dom'

export default function AuthorDetails({ authorId }) {
    const { contacts } = useUser()
    const [author, setAuthor] = useState({})

    useEffect(() => {
        setAuthor(contacts.find(contact => contact.id == authorId))
    }, [authorId])

    if (!author) return <div>Loading...</div>;

    return (
        <div className="author-details">
            <Link to={`/profile/${author.id}`} className="author-link">
                <div className="initials-circle" style={{backgroundColor:author.favouriteColour}}>{author.initials}</div>
                <h4>{author.firstName} {author.lastName}</h4>
            </Link>
        </div>
    )
} 