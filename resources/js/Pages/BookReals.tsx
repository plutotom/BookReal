import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookReal from "./BookReals/BookReal";
import PostForm from "./PostForm";

export default function BookReals({ bookReals, auth }: any) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex flex-col self-center bg-background md:items-center ">
        {bookReals.map((bookReal: any) => (
          <BookReal
            key={bookReal.id}
            title={bookReal.title}
            ponder={bookReal.ponder}
            quote={bookReal.quote}
            id={bookReal.id}
            created_at={bookReal.created_at}
            user_id={bookReal.user_id}
          />
        ))}

        <div className="fixed bottom-0 right-0 p-4">
          <PostForm />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
