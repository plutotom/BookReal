import { Button } from "@/Components/MidwayComponents";

export default function AddBookForm() {
  return (
    <>
      <form className="mt-6 space-y-6">
        <Button>Add New Book</Button>

        <div className="flex flex-col space-y-4">
          <label
            htmlFor="book"
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Book
          </label>
          <input
            id="book"
            name="book"
            type="text"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-border focus:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:border-input disabled:cursor-not-allowed disabled:opacity-50 sm:text-left"
          />
        </div>
      </form>
    </>
  );
}
