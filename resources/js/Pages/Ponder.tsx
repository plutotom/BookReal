import { Separator } from "@/Components/MidwayComponents";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Comments, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import BookReal from "./BookReals/BookReal";

interface PonderProps extends PageProps {
  ponder: {
    id: number;
    user_id: number;
    book_title: string;
    ponder_text: string;
    quote: string;
    created_at: string;
    comments: Comments[];
  };
}

export default function Ponder({ auth, ponder }: PonderProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Ponder
        </h2>
      }
    >
      <Head title="Ponder" />
      <div className="bg-background">
        <BookReal
          book_title={ponder.book_title}
          ponder_text={ponder.ponder_text}
          quote={ponder.quote}
          id={ponder.id}
          created_at={ponder.created_at}
          user_id={ponder.user_id}
          comments={ponder.comments}
        />
        {/* for each all of the comments out here  */}
        <div className=" flex flex-col p-5 ">
          {ponder.comments.map((comment: Comments) => {
            return (
              <div key={comment.id} className="">
                <p>{comment.comment_text}</p>
                <Separator />
              </div>
            );
          })}
        </div>{" "}
      </div>
    </AuthenticatedLayout>
  );
}
