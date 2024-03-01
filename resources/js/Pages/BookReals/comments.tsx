import { Comments } from "@/types";
import { Separator } from "@radix-ui/react-select";
export function Comments({ ponder_id }: { ponder_id: number }) {
  // get comments for this ponder
  const comments = [
    {
      id: 1,
      comment_text: "I agree with this",
      parent_id: null,
    },
    {
      id: 2,
      comment_text: "I disagree with this",
      parent_id: null,
    },
    {
      id: 3,
      comment_text: "I agree with this",
      parent_id: 1,
    },
    {
      id: 4,
      comment_text: "I disagree with this",
      parent_id: 2,
    },
  ];

  return (
    <div className=" flex flex-col p-5 ">
      {/* // @ts-ignore */}
      {comments.map((comment: Comments) => {
        if (comment.parent_id === null)
          return (
            <div key={comment.id} className="">
              <p className="">{comment.comment_text}</p>
              <Separator />
            </div>
          );
      })}
    </div>
  );
}
