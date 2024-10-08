import { useEffect, useState } from 'react'
import Comment from './Comment'
import { usePost } from "../../contexts/PostContext"

export default function CommentList({ postId }) {
    const { fetchComments } = usePost()
    const [comments, setComments] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)
    
    useEffect(() => {
        const fetch = async () => {
            const commentsData = await fetchComments(postId)
            setComments(commentsData)
        }
        fetch()
    }, [postId])

    const toggleComments = () => {
        setShowAllComments(!showAllComments)
    }
    
    return (
        <div className="comment-list">
        {comments.length > 3 && (
            <button onClick={toggleComments}>
                {showAllComments ? 'See less comments' : 'See previous comments'}
            </button>)}

        {comments.slice(0, showAllComments ? comments.length : 3).map(comment => (
            <Comment key={comment.id} comment={comment} />))}
        </div>
    )
}