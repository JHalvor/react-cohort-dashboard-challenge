import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AuthorDetails from './AuthorDetails'
import CommentForm from './CommentForm'
import { usePost } from '../context/PostContext'

export default function Post({ post }) {
    const { id } = useParams()
    const { posts } = usePost()
    const [postState, setPostState] = useState(null)

    useEffect(() => {
        posts.forEach((p) => {
        if (p.id == id) {
            setPostState(p);
        }})
    }, [])
    
    if (postState) {
        post = postState
    }

    return (
        <div className="post">
            <AuthorDetails contactId={post.contactId} />
            <div className="post-content">
                <Link to={`/post/${post.id}`}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </Link>
            </div>
            <div className="post-comments">
                <CommentList postId={post.id} />
            </div>
            <CommentForm postId={post.id} />
        </div>
    )
}