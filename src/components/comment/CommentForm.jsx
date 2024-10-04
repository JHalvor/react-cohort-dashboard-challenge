import { useState } from 'react'
import { usePost } from "../../contexts/PostContext"

export default function CommentForm({ postId }) {
    const { postComment } = usePost()
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
        postComment(formData, postId)
        setFormData(initialState)
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