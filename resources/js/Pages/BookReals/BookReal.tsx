import { Quote } from "@/Components/MidwayComponents/Quote";

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
  return (
    <div className="w-3/4 rounded-lg border bg-primary p-4">
      <div className="">
        <div>
          <div className="p-0">
            <h3 className="my-[-12px]">{title}</h3>
            <div className="flex flex-row text-muted-foreground">
              <p className="">{"Isaiah Proctor"} - </p>
              <p className=""> {new Date(created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <Quote>{quote}</Quote>
        <p>{ponder}</p>
      </div>
    </div>
  );
}
