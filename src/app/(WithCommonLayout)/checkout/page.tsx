import { Fragment } from "react";
import { getMe } from "../../../services/UserApi";
import { getProductById } from "../../../services/EventApi";
import CheckoutPage from "../../../components/modules/CheckoutPage";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;

  const productId = params?.id || "";

  const { data: product } = await getProductById(productId);
  const { data: profile } = await getMe();

  return (
    <Fragment>
      <CheckoutPage product={product} profile={profile} />
    </Fragment>
  );
}
