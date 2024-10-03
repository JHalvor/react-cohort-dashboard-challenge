import { useState, createContext  } from 'react'
import { Route, Routes } from 'react-router-dom'
import PostFeed from './components/PostFeed'
//import ProfilePage from './components/ProfilePage'
import Post from './components/Post'
import TopHeader from './components/TopHeader'
import NavigationMenu from './components/NavigationMenu'
export const PostContext = createContext()
export const UsernameContext = createContext()

export default function App() {
  const username = "JHalvor"
  const url = `https://boolean-uk-api-server.fly.dev/${username}/post`
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    const response = await fetch(url)
    const jsonData = await response.json()
    setPosts(jsonData)
    setLoading(false)
  }

  return (
    <div className="main-layout">
      <TopHeader />
      <div className="home">
        <NavigationMenu />
        <div className="content">
          <UsernameContext.Provider
            value={{
              username: username
            }}>
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
          </UsernameContext.Provider>
        </div>
      </div>
    </div>
  )
}