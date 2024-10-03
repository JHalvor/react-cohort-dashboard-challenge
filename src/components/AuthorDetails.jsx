import { useEffect, useState, useContext } from 'react';
import { UsernameContext } from '../App'

export default function AuthorDetails({ contactId }) {
    const { username } = useContext(UsernameContext)
    const [author, setAuthor] = useState({})
    const authorUrl = `https://boolean-uk-api-server.fly.dev/${username}/contact/${contactId}`

    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch(authorUrl)
            const jsonData = await response.json()
            setAuthor(jsonData);
        };
        fetchAuthor();
    }, [contactId]);

    return (
        <div className="author-details">
            <span className="author-initials">{author.firstName?.charAt(0).toUpperCase()} {author.lastName?.charAt(0).toUpperCase()}</span>
            <h4>{author.firstName} {author.lastName}</h4>
        </div>
    )
}