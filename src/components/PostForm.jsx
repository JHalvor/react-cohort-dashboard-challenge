import { useState, useContext } from 'react'
import { PostContext, UserContext } from '../App'

export default function PostForm() {
    const { fetchPosts } = useContext(PostContext)
    const { username, loggedInUser } = useContext(UserContext)
    const initials = `${loggedInUser.firstName?.charAt(0).toUpperCase()} ${loggedInUser.lastName?.charAt(0).toUpperCase()}`
    const initialState = {
        title: "",
        content: "",
        contactId: 0
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const contactsUrl = `https://boolean-uk-api-server.fly.dev/${username}/contact/`
        const response = await fetch(contactsUrl)
        const jsonData = await response.json()
        const randomContactIndex = Math.floor(Math.random() * ((jsonData.length - 1)))
        formData.contactId = jsonData[randomContactIndex].id

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: formData.title, 
                content: formData.content, 
                contactId: formData.contactId })
        }

        await fetch(`https://boolean-uk-api-server.fly.dev/${username}/post`, requestOptions)
        setFormData(initialState)
        fetchPosts()
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <div className="circle">
                <span>{initials}</span>
            </div>
            <input 
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required/>
            <textarea 
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required/>
            <button type="submit">Post</button>
        </form>
    )
}