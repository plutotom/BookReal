import { Comments } from "@/types";
import { FaRegComment } from "react-icons/fa";

interface BookRealBtnBarProps {
  comments: Comments[];
  onClick?: () => void;
}

export function BookRealBtnBar({
  comments = [],
}: React.PropsWithChildren<BookRealBtnBarProps>) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <FaRegComment />
        {comments.length}
      </div>
    </div>
  );
}
