import { Button, Input } from "@/Components/MidwayComponents";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/MidwayComponents/Dialog";
import { IoMdAdd } from "react-icons/io";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/MidwayComponents/Select";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function PostForm({}) {
  const [open, setOpen] = React.useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    quote: "",
    ponder: "",
  });

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
          <Button className="border-border bg-secondary">
            <IoMdAdd className="text-secondary-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <form onSubmit={submit}>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full">
                    <Select
                      onValueChange={(value) => {
                        console.log(value);
                        setData("title", value);
                      }}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Book" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="plato the republic">
                            Plato the republic
                          </SelectItem>
                          <SelectItem value="the prince">The Prince</SelectItem>
                          <SelectItem value="the art of war">
                            The Art of War
                          </SelectItem>
                          <SelectItem value="Thomas Aquinas">
                            Thomas Aquinas
                          </SelectItem>
                          <SelectItem value="Aristotle">Aristotle</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    type="text"
                    value={data.quote}
                    onChange={(e) => setData("quote", e.target.value)}
                    placeholder="Quote"
                    name="Quote"
                  ></Input>

                  <textarea
                    name="quote"
                    onChange={(e) => setData("ponder", e.target.value)}
                    value={data.ponder}
                    id="quote"
                    cols={100}
                    rows={3}
                    className="w-1/2 rounded-lg border-2 border-gray-200 p-2"
                    placeholder="Thought"
                  ></textarea>
                  <Button
                    onSubmit={submit}
                    disabled={processing}
                    color="secondary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" color="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
