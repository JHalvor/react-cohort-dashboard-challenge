import { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { usePost } from '../../contexts/PostContext'
import Circle from '../InitialsCircle'

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
            <Circle color={loggedInUser.favouriteColour}/>
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