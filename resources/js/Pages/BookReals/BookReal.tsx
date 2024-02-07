import { Quote, Separator } from "@/Components/MidwayComponents";
import { FaRegComment } from "react-icons/fa";

export default function BookReal({
  book_title,
  ponder_text,
  quote,
  id,
  created_at,
  user_id,
  comments,
}: BookRealProps) {
  const user = {
    signature: "Isaiah Proctor",
  };
  console.log("comments: " + comments);
  console.log(comments);

  return (
    <div className="w-full p-4 transition duration-150 ease-in-out hover:bg-base/[0.1] md:max-w-2xl">
      <div className="p-0">
        <h3 className="text-2xl font-semibold">{book_title}</h3>
        <div className="flex flex-row text-sm text-muted-foreground">
          <p className="text-sm">{"Isaiah Proctor"} - </p>
          <p className="text-sm">{new Date(created_at).toLocaleString()}</p>
        </div>
      </div>
      <Quote>{quote}</Quote>
      <p className="pb-3">
        {ponder_text} -
        {user && user.signature ? (
          <span>{user.signature}</span>
        ) : (
          <em> Author in cursive</em>
        )}
        <em className="font-cursive"> Author in cursive</em>
      </p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <FaRegComment />
          {comments.length}
        </div>
      </div>

      <Separator />
    </div>
  );
}

interface BookRealComment {
  comment_id: number;
  user_id: number;
  ponder_id: number;
  comment_text: string;
  created_at: string;
  updated_at: string;
  parent_id: number | null;
}

interface BookRealProps {
  book_title: string;
  ponder_text: string;
  quote: string;
  id: number;
  created_at: string;
  user_id: number;
  comments: BookRealComment[];
}
