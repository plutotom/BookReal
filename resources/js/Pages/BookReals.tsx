import { Separator } from "@/Components/MidwayComponents/Separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import BookReal from "./BookReals/BookReal";
import PostForm from "./PostForm";

export default function BookReals({ bookReals, auth }: any) {
  const [showAddPost, setShowAddPost] = React.useState(false);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-primary-foreground dark:text-secondary-foreground">
          BookReals
        </h2>
      }
    >
      <Head title="BookReals" />
      <Separator />

      <div className="flex flex-col items-center justify-center bg-muted">
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
