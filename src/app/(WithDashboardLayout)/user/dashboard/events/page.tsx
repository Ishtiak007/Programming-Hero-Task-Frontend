export const dynamic = "force-dynamic";
import React from "react";
import { getProductsByUser } from "../../../../../services/EventApi";
import ManageUserAddedEvents from "../../../../../components/modules/Events/ManageAllEvents";

const UserAddedProducts = async () => {
  const { data } = await getProductsByUser();
  const products = data ?? [];
  return (
    <div>
      <ManageUserAddedEvents products={products} />
    </div>
  );
};

export default UserAddedProducts;
