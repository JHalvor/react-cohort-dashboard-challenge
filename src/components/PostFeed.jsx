import { useEffect } from 'react'
import { useContext } from "react"
import { PostContext } from '../App'
import Post from './Post'
import PostForm from './PostForm'

export default function PostFeed() {
    const { posts, fetchPosts, loading } = useContext(PostContext)

    useEffect(() => {
        fetchPosts()
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="post-feed">
            <h1>Post Feed</h1>
            <PostForm />
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}