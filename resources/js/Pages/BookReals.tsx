import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookReal from "./BookReals/BookReal";
import PostForm from "./PostForm";
interface usersBooks {
  id: number;
  title: string;
}

export default function BookReals({
  bookReals,
  auth,
  usersBooks: usersBooks,
  canPonder,
}: any) {
  console.log(bookReals);
  return (
    <AuthenticatedLayout user={auth.user}>
      {canPonder && (
        <div className="flex flex-col self-center bg-background md:items-center ">
          {Object.keys(bookReals).map((key: string, index, ar) => (
            <div>
              <h1>{key}</h1>
              {bookReals[key].map((ponder: any) => (
                <BookReal
                  key={ponder.id}
                  book_title={ponder.book_title}
                  ponder_text={ponder.ponder_text}
                  quote={ponder.quote}
                  id={ponder.id}
                  created_at={ponder.created_at}
                  user_id={ponder.user_id}
                />
              ))}
            </div>
          ))}

          <div className="fixed bottom-0 right-0 p-4">
            <PostForm usersBooks={usersBooks} />
          </div>
        </div>
      )}

      {!canPonder && (
        <div className="text-center text-2xl">
          You must ponder before you can see others' ponderings.
          <div className="center justify-center">
            <PostForm usersBooks={[]} />
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
