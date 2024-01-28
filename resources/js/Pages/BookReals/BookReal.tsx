import { Quote, Separator } from "@/Components/MidwayComponents";

// the interface is going to be an array of objects with the following properties
// title, ponder, quote, id, created_at, user_id
interface BookRealProps {
  title: string;
  ponder: string;
  quote: string;
  id: number;
  created_at: string;
  user_id: number;
}

export default function BookReal({
  title,
  ponder,
  quote,
  id,
  created_at,
  user_id,
}: BookRealProps) {
  const user = {
    signature: "Isaiah Proctor",
  };

  return (
    <div className="w-full p-4 transition duration-150 ease-in-out hover:bg-base/[0.1] md:max-w-2xl">
      <div className="p-0">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="flex flex-row text-sm text-muted-foreground">
          <p className="text-sm">{"Isaiah Proctor"} - </p>
          <p className="text-sm">{new Date(created_at).toLocaleString()}</p>
        </div>
      </div>
      <Quote>{quote}</Quote>
      <p className="pb-3">
        {ponder} -
        {user && user.signature ? (
          <span>{user.signature}</span>
        ) : (
          <em> Author in cursive</em>
        )}
        <em className="font-cursive"> Author in cursive</em>
      </p>
      <Separator />
    </div>
  );
}
