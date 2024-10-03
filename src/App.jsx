import { useState, createContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PostFeed from './components/PostFeed'
//import ProfilePage from './components/ProfilePage'
import Post from './components/Post'
import TopHeader from './components/TopHeader'
import NavigationMenu from './components/NavigationMenu'
export const PostContext = createContext()
export const UserContext = createContext()

export default function App() {
  const username = "JHalvor"
  const url = `https://boolean-uk-api-server.fly.dev/${username}/post`
  const [posts, setPosts] = useState([])
  const [loggedInUser, setLoggedInUser] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    const response = await fetch(url)
    const jsonData = await response.json()
    setPosts(jsonData)
    setLoading(false)
  }

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const contactsUrl = `https://boolean-uk-api-server.fly.dev/${username}/contact/`
      const response = await fetch(contactsUrl)
      const jsonData = await response.json()
      const randomContactIndex = Math.floor(Math.random() * ((jsonData.length - 1)))
      setLoggedInUser(jsonData[randomContactIndex])
    }
    fetchLoggedInUser()
  }, [])

  return (
    <div className="main-layout">
      <UserContext.Provider
            value={{
              username: username,
              loggedInUser: loggedInUser
            }}>
        <TopHeader />
        <div className="home">
          <NavigationMenu />
          <div className="content">
            
                <PostContext.Provider
                  value={{
                    posts: posts,
                    fetchPosts: fetchPosts,
                    loading: loading
                  }}>

                  <Routes>
                    <Route path="/" element={<PostFeed />} />
                    {/* <Route path="/profile" element={<ProfilePage />} /> */}
                    <Route path="/post/:id" element={<Post />} />
                  </Routes>

                </PostContext.Provider>
          </div>
        </div>
      </UserContext.Provider>
    </div>
  )
}