/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { toast } from "sonner";
import { IUser } from "../../../types/user";
import Container from "../../shared/Container";
import { Button } from "../../ui/button";
import { addOrder } from "../../../services/JoinApi";
import { TEvent } from "../../../types/event";

export default function CheckoutPage({
  product,
  profile,
}: {
  product: TEvent;
  profile: IUser;
}) {
  const handleConfirmPay = async () => {
    const itemID = product?._id;
    try {
      const response = await addOrder({ itemID });
      if (response?.success) {
        toast.success("Your Request sent successfully done");

        // Do NOT redirect, but you can handle response.data if needed here
        // For example, show payment info or keep user on the same page
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to send request");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Container className="my-5">
      <div>
        <div className="lg:w-[70%] mx-auto w-full space-y-6">
          <div className="bg-white p-6 shadow-md rounded-md">
            <div className="space-y-5">
              {/* Product Details */}
              <div className="lg:flex justify-center items-center gap-6">
                {product?.images?.[0] && (
                  <Image
                    src={product?.images?.[0]}
                    alt=" Image"
                    width={150}
                    height={150}
                    className="rounded-md shadow-md"
                  />
                )}
                <div>
                  <p className="text-xl font-semibold text-gray-900">
                    {product?.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Department: {product?.category}
                  </p>
                </div>
              </div>

              {/* Total Items & Price */}
              <div className="text-sm text-gray-600 space-y-2 text-center">
                <p className="text-xl font-semibold text-blue-800 mt-2">
                  Approximately cost: USD {product?.price} $
                </p>
              </div>

              <hr className="border-t border-gray-300" />

              <div className="lg:flex justify-around items-start gap-4 space-y-2">
                {/* Seller */}
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    Event Poster Info
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>Name:</strong> {product?.userID?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {product?.userID?.identifier}
                    </p>
                    <p>
                      <strong>Location:</strong> {product?.location}
                    </p>
                    <p>
                      <strong>Number:</strong> {product?.contactNumber}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Buyer */}
                  <p className="font-semibold text-lg text-gray-800">(You)</p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>User Name:</strong> {profile?.name}
                    </p>
                    <p>
                      <strong>User Email:</strong> {profile?.identifier}
                    </p>
                    {profile?.city && (
                      <p>
                        <strong>User Location:</strong> {profile?.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-300 my-6" />

            {/* Agreement Checkbox & Pay Button */}
            <div className="space-y-4">
              <Button
                onClick={handleConfirmPay}
                className="mx-auto hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out hover:bg-blue-800 hover:text-white my-4 mt-2 bg-blue-700 text-white"
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
