import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import CommentList from './CommentList'
import AuthorDetails from './AuthorDetails'
import { useParams } from "react-router-dom";
import { PostContext } from '../App'

export default function Post({ post }) {
    const { id } = useParams()
    const { posts } = useContext(PostContext)
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
            <h2>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.body}</p>
            <CommentList postId={post.id} />
        </div>
    )
}