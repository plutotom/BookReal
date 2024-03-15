const CommentSection = ({ ponder }: any) => {
  let comments = ponder.comments;
  const renderComments = (comments: any[], depth: number = 0) => {
    return comments.map((comment: any) => (
      <div key={comment.id}>
        <Comment comment={comment} depth={depth} />
        {comment.children && renderComments(comment.children, depth + 1)}
      </div>
    ));
  };

  // Organizing comments into a tree structure
  const buildCommentTree = (comments: any[]) => {
    const commentMap: { [parentId: number]: any } = {};
    const roots: any[] = [];

    comments.forEach((comment) => {
      comment.children = [];
      commentMap[comment.id] = comment;
      if (comment.parent_id === null) {
        roots.push(comment);
      } else {
        const parent = commentMap[comment.parent_id];
        parent.children.push(comment);
      }
    });

    return roots;
  };

  const commentTree = buildCommentTree(comments);

  return <div>{renderComments(commentTree)}</div>;
};

const Comment = ({ comment, depth }: any) => {
  return (
    <div
      style={{
        marginLeft: `${depth * 20}px`,
        borderLeft: "1px solid #ccc",
        paddingLeft: "10px",
        marginBottom: "10px",
      }}
    >
      <p>{comment.comment_text}</p>
    </div>
  );
};

export default CommentSection;
