import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App'

export default function AuthorDetails({ contactId }) {
    const { username, loggedInUser } = useContext(UserContext)
    const initials = `${loggedInUser.firstName?.charAt(0).toUpperCase()} ${loggedInUser.lastName?.charAt(0).toUpperCase()}`
    const [author, setAuthor] = useState({})
    const authorUrl = `https://boolean-uk-api-server.fly.dev/${username}/contact/${contactId}`

    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch(authorUrl)
            const jsonData = await response.json()
            setAuthor(jsonData)
        };
        fetchAuthor()
    }, [contactId])

    return (
        <div className="author-details">
            <div className="circle">
                <span>{initials}</span>
            </div>
            <h4>{author.firstName} {author.lastName}</h4>
        </div>
    )
}