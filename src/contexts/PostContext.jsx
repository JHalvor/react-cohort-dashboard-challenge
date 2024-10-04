import { createContext, useContext, useState } from 'react'
import { useUser } from './UserContext'

const PostContext = createContext();
export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
    const { loggedInUser } = useUser()
    const url = `https://boolean-uk-api-server.fly.dev/${loggedInUser.username}/post`
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true)
        const response = await fetch(url)
        const jsonData = await response.json()
        setPosts(jsonData)
        setLoading(false)
    }

    const fetchComments = async (postId) => {
        const commentsUrl = `https://boolean-uk-api-server.fly.dev/${loggedInUser.username}/post/${postId}/comment`
    
        const response = await fetch(commentsUrl)
        const jsonData = await response.json()
        return jsonData
    }

    const postComment = async (commentData, postId) => {
        commentData.contactId = loggedInUser.id

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                postId: postId, 
                content: commentData.content, 
                contactId: commentData.contactId })
        }

        await fetch(`https://boolean-uk-api-server.fly.dev/${loggedInUser.username}/post/${postId}/comment`, requestOptions)
        fetchPosts()
    }

    const createPost = async (postData) => {
        postData.contactId = loggedInUser.id

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: postData.title, 
                content: postData.content, 
                contactId: postData.contactId })
        }
        
        await fetch(`https://boolean-uk-api-server.fly.dev/${loggedInUser.username}/post`, requestOptions)
        fetchPosts()
    }

    return (
        <PostContext.Provider 
            value={{ 
                posts: posts, 
                fetchPosts: fetchPosts, 
                loading: loading,
                createPost: createPost,
                fetchComments: fetchComments,
                postComment: postComment
            }}>
            {children}
        </PostContext.Provider>
    )
}
