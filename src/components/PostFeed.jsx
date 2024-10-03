import { useEffect } from 'react'
import { usePost } from '../context/PostContext'
import Post from './Post'
import PostForm from './PostForm'

export default function PostFeed() {
    const { posts, fetchPosts, loading } = usePost()

    useEffect(() => {
        fetchPosts()
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="post-feed">
            <PostForm />
            {posts.toReversed().map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}