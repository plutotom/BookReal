import { Comments as CommentsType } from "@/types";
import React from "react";
import LeaveComment from "./Partials/LeaveComment";

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

const Comment = ({
  comment,
  depth,
}: {
  comment: CommentsType;
  depth: number;
}) => {
  return (
    <div
      className="mt-4 w-full border-l border-gray-300 pl-4 pr-4"
      style={{
        marginLeft: `${depth * 20}px`,
      }}
    >
      <p className="whitespace-pre-wrap">{comment.comment_text}</p>
      <CommentButtonBar
        parentId={comment.parent_id}
        postId={comment.ponder_id}
        commentId={comment.id}
      />
    </div>
  );
};

const CommentButtonBar = ({
  parentId,
  postId,
  commentId,
}: {
  parentId: number | null;
  postId: number;
  commentId: number;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-black pe-2 ps-2 ">
      {/* <p className="text-xs text-gray-500">{commentId}</p> */}
      <LeaveComment
        parentId={commentId} // This the id of what the user is commenting on
        postId={postId}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default CommentSection;
