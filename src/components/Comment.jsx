import AuthorDetails from './AuthorDetails'

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <AuthorDetails contactId={comment.contactId} />
      <p>{comment.body}</p>
    </div>
  )
}