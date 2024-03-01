import { Quote, Separator } from "@/Components/MidwayComponents";
import { Comments } from "@/types";
import { BookRealBtnBar } from "./BookRealBtnBar";

export default function BookReal({
  book_title,
  ponder_text,
  quote,
  id,
  created_at,
  user_id,
  comments,
  ...props
}: React.PropsWithChildren<BookRealProps>) {
  const user = {
    signature: "Isaiah Proctor",
  };

  return (
    <div
      {...props}
      className="w-full p-4 transition duration-150 ease-in-out hover:bg-base/[0.1] md:max-w-2xl"
    >
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

      <BookRealBtnBar comments={comments} />

      <Separator />
    </div>
  );
}

interface BookRealProps {
  book_title: string;
  ponder_text: string;
  quote: string;
  id: number;
  created_at: string;
  user_id: number;
  comments: Comments[];
  onClick?: () => void;
}
