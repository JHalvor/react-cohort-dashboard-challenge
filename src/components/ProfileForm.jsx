import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import AuthorDetails from './AuthorDetails'

export default function ProfileForm() {
    const { loggedInUser, updateUser } = useUser()
    const initialState = {
        id: 0,
        firstname: "",
        lastName: "",
        gender: "",
        email: "",
        jobTitle: "",
        street: "",
        city: "",
        latitude: parseFloat(0.0),
        longitude: parseFloat(0.0),
        favouriteColour: "",
        profileImage: "",
        username: ""
    }

    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        setFormData(loggedInUser)
    }, [loggedInUser.id])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        updateUser(formData)
    }

    return (
        <>
            <AuthorDetails authorId={loggedInUser.id}/>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="account-info">
                    <h2>Account info</h2>
                    <label>First Name*
                        <input
                        name="firstName"
                        type="text"
                        onChange={handleChange}
                        value={formData.firstName}
                        required/>
                    </label>
                    <label>Last Name*
                        <input
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        value={formData.lastName}
                        required/>
                    </label>
                    <label>Username*
                        <input
                        name="username"
                        type="text"
                        onChange={handleChange}
                        value={formData.username}
                        required/>
                    </label>
                    <label>Email*
                        <input
                        name="email"
                        type="text"
                        onChange={handleChange}
                        value={formData.email}
                        required/>
                    </label>
                </div>
                <div className="address-info">
                    <h2>Address info</h2>
                    <label>Street
                        <input
                        name="street"
                        type="text"
                        onChange={handleChange}
                        value={formData.street}
                        required/>
                    </label>
                    <label>City
                        <input
                        name="city"
                        type="text"
                        onChange={handleChange}
                        value={formData.city}
                        required/>
                    </label>
                </div>
                <div className="company-info">
                    <h2>Company info</h2>
                    <label>Title
                        <input
                        name="jobTitle"
                        type="text"
                        onChange={handleChange}
                        value={formData.jobTitle}
                        required/>
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </>
    )
}