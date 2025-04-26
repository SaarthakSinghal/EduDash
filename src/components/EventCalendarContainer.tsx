//This component is used to display two components:
//1. EventCalendar - A static calendar component, a clickable component that displays the event details in a modal
//2. EventList - A dynamic list of events
//Logic: When user clicks on a date, date will pass to the URL, the EventList component will display the events for that date,

import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

// We need to pass the searchParams to the parent page, to pass those searchParams to the components
const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const date = searchParams.date;
  return (
    <div className="rounded-xl bg-white p-4">
      <EventCalendar />
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Events</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
