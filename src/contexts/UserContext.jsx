import { createContext, useContext, useState } from 'react'

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const myGithubUsername = "JHalvor"
    const [loggedInUser, setLoggedInUser] = useState({})
    const [contacts, setContacts] = useState([])

    const fetchContacts = async () => {
        const contactsUrl = `https://boolean-uk-api-server.fly.dev/${myGithubUsername}/contact/`
        const response = await fetch(contactsUrl)
        const jsonData = await response.json()
        jsonData.map(contact => contact.initials = `${contact.firstName?.charAt(0).toUpperCase()} ${contact.lastName?.charAt(0).toUpperCase()}`)

        setContacts(jsonData)
    }

    const fetchLoggedInUser = async () => {
        const loggedInUserId = 1
        const loggedInUserUrl = Object.keys(loggedInUser).length <= 0
            ? `https://boolean-uk-api-server.fly.dev/${myGithubUsername}/contact/${loggedInUserId}`
            : `https://boolean-uk-api-server.fly.dev/${myGithubUsername}/contact/${loggedInUser.id}`

        const response = await fetch(loggedInUserUrl)
        const newLoggedInUser = await response.json()
        
        newLoggedInUser.initials = `${newLoggedInUser.firstName?.charAt(0).toUpperCase()} ${newLoggedInUser.lastName?.charAt(0).toUpperCase()}`

        newLoggedInUser.username = `${newLoggedInUser.firstName?.charAt(0).toUpperCase()}${newLoggedInUser.lastName?.slice(0, newLoggedInUser.lastName?.length)}`
        setLoggedInUser(newLoggedInUser)
    }

    const updateUser = async (userData) => {
        userData.contactId = loggedInUser.id

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                firstName: userData.firstName,
                lastName: userData.lastName,
                street: userData.street,
                city: userData.city,
                gender: userData.gender,
                email: userData.email,
                jobTitle: userData.jobTitle,
                latitude: userData.latitude,
                longitude: userData.longitude,
                favouriteColour: userData.favouriteColour,
                profileImage: userData.profileImage })
        }

        await fetch(`https://boolean-uk-api-server.fly.dev/${myGithubUsername}/contact/${loggedInUser.id}`, requestOptions)
        fetchLoggedInUser()
    }
    
    return (
        <UserContext.Provider 
            value={{ 
                contacts: contacts,
                loggedInUser: loggedInUser, 
                fetchLoggedInUser: fetchLoggedInUser,
                fetchContacts: fetchContacts,
                updateUser: updateUser
                }}>
            {children}
        </UserContext.Provider>
    )
}
