import { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { usePost } from '../../contexts/PostContext'

export default function PostForm() {
    const { createPost } = usePost()
    const { loggedInUser } = useUser()
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

        createPost(formData)
        setFormData(initialState)
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <div className="initials-circle" style={{backgroundColor:loggedInUser.favouriteColour}}>{loggedInUser.initials}</div>
            <div className="post-text-area">
                <input 
                    className="post-title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required/>
                <textarea 
                    className="post-content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    required/>
            </div>
            <button type="submit">Post</button>
        </form>
    )
}