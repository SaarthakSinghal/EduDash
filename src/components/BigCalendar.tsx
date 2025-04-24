"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { calendarEvents } from "src/lib/data";
import { useState } from "react";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      view={view}
      onView={setView}
      min={new Date(2055, 2, 15, 8, 0)}
      max={new Date(2055, 2, 15, 17, 0)}
      views={["work_week", "day"]}
    />
  );
};

export default BigCalendar;
