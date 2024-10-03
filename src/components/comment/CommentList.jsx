import { useEffect, useState } from 'react'
import Comment from './Comment'
import { useUser } from "../../contexts/UserContext"

export default function CommentList({ postId }) {
    const { username } = useUser()
    const [comments, setComments] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)
    const commentsUrl = `https://boolean-uk-api-server.fly.dev/${username}/post/${postId}/comment`
    
    useEffect(() => {
        const fetchComments = async () => {
        const response = await fetch(commentsUrl)
        const jsonData = await response.json()
        setComments(jsonData)
        }
        fetchComments()
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