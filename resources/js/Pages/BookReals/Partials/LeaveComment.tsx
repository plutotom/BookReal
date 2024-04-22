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
import { useForm } from "@inertiajs/react";
import React from "react";
import { IoMdAdd } from "react-icons/io";

import BookStackSVG from "@/Components/BookStackSVG";
import { useHotkeys } from "react-hotkeys-hook";

// ------------------------------------------------------

export default function LeaveComment({
  postId,
  parentId,
  open,
  setOpen,
}: {
  postId: number;
  parentId: number | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { data, setData, post, processing, reset } = useForm({
    content: "",
    parentId: parentId ?? null,
  });

  useHotkeys("mod+enter", () => {
    console.log("enter mod");
    if (open) {
      handlePost(new Event("submit"));
    }
  });

  const handlePost = (e: React.SyntheticEvent | Event) => {
    e.preventDefault();
    console.log("posting...");
    post(`/comments/${postId}`, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  // ------------------------------------------------------

  return (
    <div className="overflow-auto p-2">
      <form
        className="flex w-full items-center space-x-2 overflow-auto py-5 pe-2 ps-1"
        onSubmit={handlePost}
      >
        {open && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 w-20 rounded-full border-border bg-primary">
                <IoMdAdd className="text-primary-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent className="h-full md:h-2/3 md:max-w-lg">
              <form onSubmit={handlePost}>
                <DialogHeader className="h-1/3">
                  <DialogTitle>Post a Ponder</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <BookStackSVG className="w-1/4 md:w-1/3" />
                </div>
                <h3 className="text-semibold text-xl">Comment...</h3>
                <div className="py-3"></div>
                <textarea
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.metaKey) {
                      handlePost(e);
                    }
                  }}
                  className="h-32 w-full rounded-xl border border-border p-2 ring-black"
                  value={data.content}
                  onChange={(e) => {
                    setData("content", e.target.value);
                  }}
                  placeholder="Add a comment"
                ></textarea>
                <div className="p-1"></div>
                <Button
                  onClick={handlePost}
                  disabled={processing}
                  color="primary"
                  type="button"
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
        )}
        <Input
          className="w-full rounded-xl border-solid p-0 text-left shadow-none outline-0 focus:border-0 focus:border-none focus:outline-0 focus:ring-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
          type="text"
          placeholder={`Add a comment`}
          name="Comment"
          maxLength={10000}
          onClick={() => {
            setOpen(true);
          }}
        ></Input>
        <Button
          variant="rounded"
          type="button"
          className=""
          onClick={() => {
            setOpen(true);
          }}
        >
          Comment
        </Button>
      </form>
    </div>
  );
}
