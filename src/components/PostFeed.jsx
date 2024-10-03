import { useEffect, useContext } from 'react'
import { PostContext } from '../App'
import Post from './Post'
import PostForm from './PostForm'

export default function PostFeed() {
    const { posts, fetchPosts, loading } = useContext(PostContext)

    useEffect(() => {
        fetchPosts()
    }, []);

    if (loading) return <div>Loading...</div>;

    console.log("in feed")

    return (
        <div className="post-feed">
            <PostForm />
            {posts.toReversed().map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}