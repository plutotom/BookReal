import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/MidwayComponents";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/MidwayComponents/Dialog";
import { IoMdAdd } from "react-icons/io";

import BookStackSVG from "@/Components/BookStackSVG";
import { Separator } from "@/Components/MidwayComponents/Separator";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function PostForm({
  usersBooks,
}: {
  usersBooks: { id: number; title: string }[];
}) {
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef(null);
  const newBookRef = React.useRef(null);
  const [currentBooks, setCurrentBooks] = React.useState(usersBooks);

  const { data, setData, post, processing, transform, errors, reset } = useForm(
    {
      book: "",
      quote: "",
      ponder: "",
      newBook: "",
    },
  );

  React.useEffect(() => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
      // Check if Cmd or Ctrl is pressed along with Enter
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        submit(event);
      }
    };

    const form = formRef.current;
    if (form) {
      // form.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (form) {
        // form.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [submit]);
  function handleSelectChange(value: string) {
    setData({
      book: value,
      newBook: data.newBook,
      quote: data.quote,
      ponder: data.ponder,
    });

    if (value === "newBook") {
      if (newBookRef.current) {
        //@ts-ignore
        newBookRef.current.style.display = "block";
        //@ts-ignore
        newBookRef.current.focus();
      }
    } else {
      if (newBookRef.current) {
        //@ts-ignore
        newBookRef.current.style.display = "none";
      }
      setData({
        book: value,
        newBook: "",
        quote: data.quote,
        ponder: data.ponder,
      });
    }
  }

  function submit(e: any) {
    e.preventDefault();
    post("/postBookReal", {
      data,
      onSuccess: () => {
        console.log("success");
        reset("book", "quote", "ponder");
        setOpen(false);
      },
      onError: (x: any) => {
        console.log("error");
        console.log(x);
      },
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="h-10 w-20 rounded-full border-border bg-primary">
            <IoMdAdd className="text-primary-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-full md:h-2/3 md:max-w-lg">
          <DialogHeader className="h-1/3">
            <DialogTitle>Post a Ponder</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <BookStackSVG className="w-1/4 md:w-1/3" />
          </div>
          <form
            className="flex w-full flex-col items-center justify-start"
            ref={formRef}
            onSubmit={submit}
            // style={{ alignSelf: "flex-start" }}
          >
            {/* </form> */}
            {/* <div className="flex flex-col items-center justify-center"> */}
            <h3 className="text-semibold text-xl">Ponder...</h3>
            <div className="py-3"></div>
            <Select onValueChange={(value) => handleSelectChange(value)}>
              <SelectTrigger className="border-0 border-none p-0 shadow-none  focus:ring-0 focus-visible:ring-0 active:ring-0">
                <SelectValue placeholder="Select Book" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {currentBooks.map((book) => (
                    <SelectItem key={book.id} value={String(book.id)}>
                      {book.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectItem value="newBook">Add New Book</SelectItem>
              </SelectContent>
            </Select>

            {/* if new book select is selected then show this input filed */}
            <Input
              ref={newBookRef}
              className="w-full border-0 border-none p-0 text-left shadow-none outline-0 focus:border-0 focus:border-none focus:outline-0 focus:ring-0 focus-visible:outline-0 focus-visible:ring-0  focus-visible:ring-offset-0 active:ring-0"
              type="text"
              value={data.newBook}
              onChange={(e) => setData("newBook", e.target.value)}
              placeholder="New Book Name"
              name="Book"
              style={{
                display: "none",
              }}
            ></Input>

            <Input
              className="border-0 border-none p-0 text-left shadow-none outline-0 focus:border-0 focus:border-none focus:outline-0 focus:ring-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
              type="text"
              value={data.quote}
              onChange={(e) => setData("quote", e.target.value)}
              placeholder="Quote"
              name="Quote"
            ></Input>

            <Separator />
            <textarea
              className="w-full resize-none border-0 bg-background px-0 focus:ring-0"
              name="ponder"
              onChange={(e) => setData("ponder", e.target.value)}
              value={data.ponder}
              id="ponder"
              cols={100}
              rows={3}
              placeholder="Ponder..."
            ></textarea>

            <Button
              onSubmit={submit}
              disabled={processing}
              color="primary"
              type="submit"
              className="w-full"
            >
              Submit
            </Button>
            <div className="p-1"></div>
            <DialogFooter className="w-full">
              <DialogClose asChild>
                <Button type="button" className="w-full" color="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
