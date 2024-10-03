import { useState, useContext } from 'react'
import { PostContext, UserContext } from '../App'

export default function CommentForm({ postId }) {
    const { fetchPosts } = useContext(PostContext)
    const { username } = useContext(UserContext)
    const initialState = {
        postId: 0,
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
                postId: postId, 
                content: formData.content, 
                contactId: formData.contactId })
        }

        await fetch(`https://boolean-uk-api-server.fly.dev/${username}/post/${postId}/comment`, requestOptions)
        setFormData(initialState)
        fetchPosts()
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <input 
                name="content"
                type="text"
                value={formData.content}
                onChange={handleChange}
                placeholder="Add a comment..."
                required/>
            <button type="submit">Post comment</button>
        </form>
    )
}