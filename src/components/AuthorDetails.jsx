import { useEffect, useState } from 'react';
import { useContext } from 'react'
import { UsernameContext } from '../App'

export default function AuthorDetails({ contactId }) {
    const { username } = useContext(UsernameContext)
    const [author, setAuthor] = useState({})
    const authorUrl = `https://boolean-uk-api-server.fly.dev/${username}/contact/${contactId}`

    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch(authorUrl)
            const jsonData = await response.json()
            console.log("AuthorDetails - authorUrl: ", authorUrl)
            console.log("AuthorDetails - jsonData: ", jsonData)
            setAuthor(jsonData);
        };
        fetchAuthor();
    }, [contactId]);

    return (
        <div className="author-details">
            <span className="author-initials">{author.name?.charAt(0).toUpperCase()}</span>
            <span>{author.firstName} {author.lastName}</span>
        </div>
    )
}