import { Separator } from "@/Components/MidwayComponents/Separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookReal from "./BookReals/BookReal";
import PostForm from "./PostForm";

export default function BookReals({ bookReals, auth }: any) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex flex-col items-center justify-center bg-background">
        {bookReals.map((bookReal: any) => (
          <div key={bookReal.id} className="w-full">
            <BookReal
              key={bookReal.id}
              title={bookReal.title}
              ponder={bookReal.ponder}
              quote={bookReal.quote}
              id={bookReal.id}
              created_at={bookReal.created_at}
              user_id={bookReal.user_id}
            />
            <Separator />
          </div>
        ))}

        <div className="fixed bottom-0 right-0 p-4">
          <PostForm />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
