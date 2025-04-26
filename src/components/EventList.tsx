import { prisma } from "src/lib/prisma";

// Helper function to parse DD/MM/YYYY
const parseDMY = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  // Note: JavaScript months are 0-indexed (0 = January, 11 = December)
  return new Date(year, month - 1, day);
};

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  // Use the helper function if dateParam exists, otherwise use current date
  const baseDate = dateParam ? parseDMY(dateParam) : new Date();

  // Create start and end dates for the query
  const startDateTime = new Date(baseDate);
  startDateTime.setHours(0, 0, 0, 0);

  const endDateTime = new Date(baseDate);
  endDateTime.setHours(23, 59, 59, 999);

  // console.log("Querying events from:", startDateTime, "to:", endDateTime); // For debugging

  //Fetch events from database where the start time is between the start and end of the date
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: startDateTime,
        lte: endDateTime,
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  console.log("Found events:", data); // For debugging

  // data.map((...) => ( <div /> )) is okay	✅ Because it's wrapped in an array
  /*
  ✅ When You Don't Use Curly Braces:

Use parentheses () for implicit return.

data.map((event) => (
  <div key={event.id}>{event.title}</div>
));

👉 You're not using curly braces here because you're implicitly returning the <div> from the arrow function. No need to write return explicitly.
✅ When You Do Use Curly Braces:

Use curly braces {} when you want to do some logic inside the arrow function body, or when using explicit return.

data.map((event) => {
  const formattedDate = new Date(event.startTime).toLocaleString("en-IN");

  return (
    <div key={event.id}>
      <h3>{event.title}</h3>
      <p>{formattedDate}</p>
    </div>
  );
});

🚨 If you use curly braces {} but don't write return, React will return undefined, and nothing will render!
⚠️ Common Mistake:

// This won't work — nothing will render
data.map((event) => {
  <div>{event.title}</div>;
});

Why? Because you're using {} but forgot to add return inside it.
*/

  return data.map((event) => (
    <div
      className="rounded-md border-2 border-t-4 border-gray-100 bg-white p-4 odd:border-t-lamaSky even:border-t-lamaPurple"
      key={event.id}
    >
      {/* UPPER PART */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <h4 className="text-sm text-gray-400">
          {event.startTime.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </h4>
      </div>
      {/* LOWER PART */}
      <div className="mt-2 text-sm text-gray-300">{event.description}</div>
    </div>
  ));
};

export default EventList;
