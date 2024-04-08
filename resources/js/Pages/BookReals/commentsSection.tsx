import { Button } from "@/Components/MidwayComponents";
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
      className="mb-4 border-l border-gray-300 pl-4 pr-4"
      style={{
        marginLeft: `${depth * 20}px`,
      }}
    >
      <p className="whitespace-pre-wrap">{comment.comment_text}</p>
      <CommentButtonBar
        parentId={comment.parent_id}
        postId={comment.ponder_id}
      />
    </div>
  );
};

const CommentButtonBar = ({
  parentId,
  postId,
}: {
  parentId: number | null;
  postId: number;
}) => {
  const [open, setOpen] = React.useState(false);

  const setToClose = () => {
    setOpen(false);
  };

  const setToOpen = () => {
    setOpen(true);
  };

  return (
    <div className="flex justify-between border-b border-t pe-2 ps-2">
      <div>
        <Button
          type="button"
          color="primary"
          variant="rounded"
          className="text-xs"
          onClick={() => setOpen(true)}
        >
          Reply
        </Button>
      </div>
      <div>
        <Button variant="rounded" className="text-xs">
          Like
        </Button>
      </div>
      <LeaveComment
        parentId={parentId}
        postId={postId}
        open={open}
        setToOpen={setToOpen}
        setToClose={setToClose}
      />
    </div>
  );
};

export default CommentSection;
