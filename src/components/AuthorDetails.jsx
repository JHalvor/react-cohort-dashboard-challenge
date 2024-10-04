import { useEffect, useState } from 'react';
import { useUser } from "../contexts/UserContext"
import { Link } from 'react-router-dom'
import Circle from './InitialsCircle'

export default function AuthorDetails({ authorId }) {
    const { loggedInUser, contacts } = useUser()
    const [author, setAuthor] = useState({})

    useEffect(() => {
        setAuthor(contacts.find(contact => contact.id == authorId))
    }, [authorId])

    if (!author) return <div>Loading...</div>;

    return (
        <div className="author-details">
            <Link to={`/profile/${author.id}`}>
                <Circle color={author.favouriteColour}/>
                <h4>{author.firstName} {author.lastName}</h4>
            </Link>
        </div>
    )
} 