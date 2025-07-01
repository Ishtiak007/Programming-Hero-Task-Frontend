import React from "react";
import { TEvent } from "../../../types/event";
import { getAllEvents } from "../../../services/EventApi";
import AllEvents from "../../../components/modules/AllEventsPage";

const AllEventsPage = async () => {
  const { data: events }: { data: TEvent[] } = await getAllEvents();
  return (
    <div>
      <AllEvents events={events} />
    </div>
  );
};

export default AllEventsPage;
