import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'

export default function ProfilePage() {
    const { id } = useParams()
    const { contacts } = useUser()
    const [author, setAuthor] = useState({})

    useEffect(() => {
        setAuthor(contacts.find(contact => contact.id == id))
    }, [id])

    return (
        <div className="profile-page">
            <img src={author.profileImage}/>
            <h4>{author.firstName} {author.lastName}</h4>
            <p>Gender: {author.gender}</p>
            <p>Title: {author.jobTitle}</p>
            <p>Email: {author.email}</p>
            <p>City: {author.city}</p>
        </div>
    )
}