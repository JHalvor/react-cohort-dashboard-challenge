import { createContext, useContext, useState } from 'react'

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [username] = useState("JHalvor")
    const [loggedInUser, setLoggedInUser] = useState({})
    const [contacts, setContacts] = useState([])

    const fetchContacts = async () => {
        const contactsUrl = `https://boolean-uk-api-server.fly.dev/${username}/contact/`
        const response = await fetch(contactsUrl)
        const jsonData = await response.json()
        setContacts(jsonData)
    }

    const fetchLoggedInUser = async () => {
        const contactsUrl = `https://boolean-uk-api-server.fly.dev/${username}/contact/`
        const response = await fetch(contactsUrl)
        const jsonData = await response.json()
        const randomContactIndex = getRandomInt(0, jsonData.length)
        const newLoggedInUser = jsonData[randomContactIndex]
        newLoggedInUser.initials = `${newLoggedInUser.firstName?.charAt(0).toUpperCase()} ${newLoggedInUser.lastName?.charAt(0).toUpperCase()}`
        setLoggedInUser(newLoggedInUser)
    }

    const fetchRandomContact = () => {
        if (contacts.length <= 0) {
            fetchContacts()
        }
        const randomContactIndex = getRandomInt(0, contacts.length)
        return contacts[randomContactIndex]
    }

    const getRandomInt = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
    }

    return (
        <UserContext.Provider 
            value={{ 
                contacts: contacts,
                username: username, 
                loggedInUser: loggedInUser, 
                fetchLoggedInUser: fetchLoggedInUser,
                fetchContacts: fetchContacts,
                fetchRandomContact: fetchRandomContact
            }}>
            {children}
        </UserContext.Provider>
    )
}
