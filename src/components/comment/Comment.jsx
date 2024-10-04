import AuthorDetails from '../AuthorDetails'

export default function Comment({ comment }) {
    return (
        <div className="comment">
            <ul>
                <AuthorDetails authorId={comment.contactId} />
                <p>{comment.content}</p>
            </ul>
        </div>
    )
}