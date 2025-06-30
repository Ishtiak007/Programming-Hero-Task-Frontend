export const dynamic = "force-dynamic";
import React from "react";
import ManageUserAddedEvents from "../../../../../components/modules/Events/ManageAllEvents";
import { getEventsByUser } from "../../../../../services/EventApi";

const UserAddedProducts = async () => {
  const { data } = await getEventsByUser();
  const events = data ?? [];
  return (
    <div>
      <ManageUserAddedEvents events={events} />
    </div>
  );
};

export default UserAddedProducts;
