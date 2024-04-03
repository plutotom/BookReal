import { Button } from "@/Components/MidwayComponents";

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
      className="mb-4 border-l border-gray-300 pl-2"
      style={{
        marginLeft: `${depth * 20}px`,
      }}
    >
      <p className="whitespace-pre-wrap">{comment.comment_text}</p>

      <CommentButtonBar />
    </div>
  );
};

const CommentButtonBar = () => {
  const handleReply = () => {
    console.log("replied");
  };
  return (
    <div className="flex justify-between rounded-xl pe-2 ps-2">
      <div>
        <Button
          type="button"
          color="primary"
          variant="rounded"
          className="text-xs"
          onClick={handleReply}
        >
          Reply
        </Button>
      </div>
      <div>
        <button className="text-xs text-muted-foreground">Like</button>
      </div>
    </div>
  );
};

export default CommentSection;
