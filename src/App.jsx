import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PostFeed from './components/post/PostFeed'
import ProfilePage from './components/ProfilePage'
import Post from './components/post/Post'
import TopHeader from './components/TopHeader'
import NavigationMenu from './components/NavigationMenu'
import { PostProvider } from './contexts/PostContext'
import { useUser } from './contexts/UserContext'

export default function App() {
  const { fetchLoggedInUser, fetchContacts } = useUser()

  useEffect(() => {
    fetchContacts()
    fetchLoggedInUser()
  }, [])

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