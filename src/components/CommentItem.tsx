import Comment from "../entities/Comment";

interface Props {
    comment: Comment
}
const CommentItem = ({ comment }: Props) => {

    return <div>
        <div>
            <h2>{comment.user.username ?? `${comment.user.first_name} ${comment.user.last_name}`}</h2>
        </div>
        <div>
            <p>
                {comment.content}
            </p>
        </div>
    </div>
}

export default CommentItem