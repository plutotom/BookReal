import {
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@/Components/MidwayComponents/Dialog";
import { useForm } from "@inertiajs/react";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import console from "console";
import { Button, Input } from "../Components/MidwayComponents";

export default function PostForm({}) {
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
      },
      onError: (x: any) => {
        console.log("error");
        console.log(x);
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <form onSubmit={submit}>
              <div className="flex flex-col items-center justify-center">
                <div className="w-full">
                  {/* <Select
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
                  </Select> */}
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
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
