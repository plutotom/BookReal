import { Button, Input } from "@/Components/MidwayComponents";
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

import { Separator } from "@/Components/MidwayComponents/Separator";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function PostForm({}) {
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef(null);
  const part1Ref = React.useRef(null);
  const part2Ref = React.useRef(null);
  const [currentBooks, setCurrentBooks] = React.useState([
    {
      id: 1,
      title: "plato",
    },
    {
      id: 2,
      title: "aristotle",
    },
    {
      id: 3,
      title: "kant",
    },
  ]);

  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    quote: "",
    ponder: "",
  });

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

  function submit(e: any) {
    e.preventDefault();
    console.log(data);
    console.log("submitting");
    post("/postBookReal", {
      data,
      onSuccess: () => {
        console.log("success");
        reset("title", "quote", "ponder");
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
          <Button className="h-10 w-20 rounded-full border-border bg-secondary">
            <IoMdAdd className="text-secondary-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Post a Ponder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <form ref={formRef} onSubmit={submit}>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full items-center">
                    {/* <Select
                      onValueChange={(value) => {
                        console.log(value);
                        setData("title", value);
                      }}
                    >
                      <SelectTrigger className="border-0 border-none p-0 shadow-none  focus:ring-0 focus-visible:ring-0 active:ring-0">
                        <SelectValue placeholder="Select Book" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {currentBooks.map((book) => (
                            <SelectItem key={book.id} value={book.title}>
                              {book.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select> */}

                    <Input
                      className=" border-0 border-none p-0 shadow-none outline-0 focus:border-0 focus:border-none focus:outline-0 focus:ring-0 focus-visible:outline-0 focus-visible:ring-0 active:ring-0"
                      type="text"
                      value={data.title}
                      onChange={(e) => setData("title", e.target.value)}
                      placeholder="Book"
                      name="Book"
                    ></Input>

                    <Input
                      className=" border-0 border-none p-0 shadow-none outline-0 focus:border-0 focus:border-none focus:outline-0 focus:ring-0 focus-visible:outline-0 focus-visible:ring-0 active:ring-0"
                      type="text"
                      value={data.quote}
                      onChange={(e) => setData("quote", e.target.value)}
                      placeholder="Quote"
                      name="Quote"
                    ></Input>
                  </div>

                  <Separator />
                  <div ref={part2Ref} className="part-2">
                    <textarea
                      className="h-80 w-full resize-none border-0 px-0 focus:ring-0"
                      name="quote"
                      onChange={(e) => setData("ponder", e.target.value)}
                      value={data.ponder}
                      id="quote"
                      cols={100}
                      rows={3}
                      placeholder="Thought"
                    ></textarea>
                    <Button
                      onSubmit={submit}
                      disabled={processing}
                      color="secondary"
                      type="submit"
                      className="w-full"
                    >
                      Submit
                    </Button>
                    <div className="p-1"></div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" color="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
