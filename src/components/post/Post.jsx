import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CommentList from '../comment/CommentList'
import AuthorDetails from '../AuthorDetails'
import CommentForm from '../comment/CommentForm'
import { usePost } from '../../contexts/PostContext'

export default function Post({ post }) {
    const { id } = useParams()
    const { posts } = usePost()
    const [postState, setPostState] = useState(null)

    useEffect(() => {
        setPostState(posts.find(post => post.id == id))
    }, [])
    
    if (postState || post == undefined) {
        post = postState
    }

    if (post == undefined) return <div>Loading...</div>;

    return (
        <div className="post">
            <AuthorDetails authorId={post.contactId} />
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