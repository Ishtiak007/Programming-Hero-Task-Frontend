import React from "react";
import { TEvent } from "../../../types/event";
import { getAllProducts } from "../../../services/EventApi";
import AllProducts from "../../../components/modules/AllEventsPage";

const AllProductsPage = async () => {
  const { data: products }: { data: TEvent[] } = await getAllProducts();
  console.log(products);
  return (
    <div>
      <AllProducts products={products} />
    </div>
  );
};

export default AllProductsPage;
