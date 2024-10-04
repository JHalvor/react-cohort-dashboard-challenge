import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PostFeed from './components/post/PostFeed'
import ProfilePage from './components/ProfilePage'
import Post from './components/post/Post'
import TopHeader from './components/TopHeader'
import NavigationMenu from './components/NavigationMenu'
import { PostProvider } from './contexts/PostContext'
import { useUser } from './contexts/UserContext'
import ProfileForm from './components/ProfileForm'

export default function App() {
  const { fetchLoggedInUser, fetchContacts, contacts, loggedInUser } = useUser()

  useEffect(() => {
    fetchContacts()
    fetchLoggedInUser()
  }, [])

  while (contacts.length <= 0 || Object.keys(loggedInUser).length <= 0) {
    return <div>Loading...</div>
  }

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
              <Route path="/profileEdit/:id" element={<ProfileForm />} />
              <Route path="/post/:id" element={<Post />} />
            </Routes>
          </PostProvider>
        </div>
      </div>
    </div>
  )
}