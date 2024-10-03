import { useState } from 'react'
import { useContext } from 'react'
import { UsernameContext } from '../App'

export default function PostForm() {
    const { username } = useContext(UsernameContext)
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

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: formData.title, 
                content: formData.content, 
                contactId: formData.contactId })
        }
        const response = await fetch(`https://boolean-uk-api-server.fly.dev/${username}/post`, requestOptions)
        const jsonData = await response.json()
        setFormData(initialState)
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required />
            <textarea 
                value={formData.content}
                onChange={handleChange}
                placeholder="Today im thinking about..."
                required/>
            <button type="submit">Post</button>
        </form>
    )
}