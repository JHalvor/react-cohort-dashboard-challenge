import { createContext, useContext, useState } from 'react'
import { useUser } from './UserContext'

const PostContext = createContext();
export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
    const { username } = useUser()
    const url = `https://boolean-uk-api-server.fly.dev/${username}/post`
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true)
        const response = await fetch(url)
        const jsonData = await response.json()
        setPosts(jsonData)
        setLoading(false)
    }

    return (
        <PostContext.Provider 
            value={{ 
                posts: posts, 
                fetchPosts: fetchPosts, 
                loading: loading
            }}>
            {children}
        </PostContext.Provider>
    )
}
