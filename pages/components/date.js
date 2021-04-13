import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  if (dateString) {
    const date = parseISO(dateString);
    return <time dateTime={date}>{format(date, "LLLL d, yyyy")}</time>;
  }
  return <div>Something was wrong with your date, see `{dateString}`</div>;
}
