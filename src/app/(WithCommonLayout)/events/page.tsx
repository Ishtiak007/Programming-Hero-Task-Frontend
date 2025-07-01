import React from "react";
import { TEvent } from "../../../types/event";
import { getAllEvents } from "../../../services/EventApi";
import AllEvents from "../../../components/modules/AllEventsPage";

const AllEventsPage = async () => {
  const { data: events }: { data: TEvent[] } = await getAllEvents();

  // Sort events by createdAt descending (most recent first)
  const sortedEvents = events?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <AllEvents events={sortedEvents} />
    </div>
  );
};

export default AllEventsPage;
