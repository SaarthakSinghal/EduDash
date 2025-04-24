"use client";

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Event no.1",
    time: "12:00PM - 2:00PM",
    description: "Describing the event 1 details",
  },
  {
    id: 2,
    title: "Event no.2",
    time: "3:00PM - 5:00PM",
    description: "Describing the event 2 details",
  },
  {
    id: 3,
    title: "Event no.3",
    time: "6:00PM - 10:00PM",
    description: "Describing the event 3 details",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="rounded-xl bg-white p-4">
      <Calendar onChange={onChange} value={value} />
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Events</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="odd:border-t-lamaSky even:border-t-lamaPurple rounded-md border-2 border-t-4 border-gray-100 bg-white p-4 "
            key={event.id}
          >
            {/* UPPER PART */}
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <h4 className="text-sm text-gray-400">{event.time}</h4>
            </div>
            {/* LOWER PART */}
            <div className="mt-2 text-sm text-gray-300">
              {event.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
