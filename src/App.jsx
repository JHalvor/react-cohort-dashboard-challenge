import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PostFeed from './components/PostFeed'
import ProfilePage from './components/ProfilePage'
import Post from './components/Post'
import TopHeader from './components/TopHeader'
import NavigationMenu from './components/NavigationMenu'
import { PostProvider } from './context/PostContext'
import { useUser } from './context/UserContext'

export default function App() {
  const { fetchLoggedInUser, fetchContacts, loggedInUser } = useUser()

  useEffect(() => {
    fetchContacts()
    fetchLoggedInUser()
  }, [])

  console.log(loggedInUser)

  return (
    <div className="main-layout">
      <TopHeader />
      <div className="home">
        <NavigationMenu />
        <div className="content">
          <PostProvider>
            <Routes>
              <Route path="/" element={<PostFeed />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/post/:id" element={<Post />} />
            </Routes>
          </PostProvider>
        </div>
      </div>
    </div>
  )
}