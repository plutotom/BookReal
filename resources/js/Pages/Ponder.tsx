import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Comments as CommentsType, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import BookReal from "./BookReals/BookReal";
import CommentSection from "./BookReals/commentsSection";

interface PonderProps extends PageProps {
  ponder: {
    id: number;
    user_id: number;
    book_title: string;
    ponder_text: string;
    quote: string;
    created_at: string;
    commentsCount: CommentsType[];
  };
}

export default function Ponder({ auth, ponder }: PonderProps) {
  console.log("ponder", ponder);
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
          comments={ponder.commentsCount}
        />

        <CommentSection ponder={ponder} />
      </div>
    </AuthenticatedLayout>
  );
}
