import React from "react";
import { getProductById } from "../../../../../../../services/EventApi";
import EventUpdateForm from "../../../../../../../components/modules/Events/EventUpdate";

const ProductUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: event } = await getProductById(id);
  return (
    <div className="p-4">
      <EventUpdateForm event={event} />
    </div>
  );
};

export default ProductUpdatePage;
