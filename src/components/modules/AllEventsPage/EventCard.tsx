"use client";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaBookmark } from "react-icons/fa6";
import { RootState } from "../../../redux/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/features/wishlist/wishlistSlice";
import { TEvent } from "../../../types/event";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

export default function EventCard({ event }: { event: TEvent }) {
  const router = useRouter();
  const {
    title,
    category,
    images,
    price,
    status,
    description,
    date,
    location,
  } = event || {};

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isInWishlist = wishlistItems.some((item) => item._id === event._id);

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      dispatch(addToWishlist(event));
    }
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(event._id));
  };

  const handleBookNow = () => {
    router.push(`/checkout?id=${event._id}`);
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg rounded-xl p-0">
      <div className="flex flex-col md:flex-row w-full">
        {/* Image section */}
        <div className="w-full md:w-[40%] h-60 relative">
          {status === "sold" && (
            <div className="absolute bottom-4 left-4 bg-rose-700 text-white py-1 px-4 text-xs font-semibold z-10 capitalize rounded-md">
              {status}
            </div>
          )}
          <Image
            src={images?.[0]}
            alt="event image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg p-3 rounded-2xl"
          />
        </div>

        {/* Content section */}
        <CardContent className="flex justify-center items-center md:w-[60%]">
          <div className="px-4 space-y-3 mt-0">
            {/* Title & Wishlist */}
            <div className="flex justify-between items-center">
              <h2 className="text-[17px] font-bold capitalize">
                {title?.length > 20 ? title.slice(0, 20) + "..." : title}
              </h2>
              <button
                onClick={
                  isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
                }
                className={`hover:text-indigo-700 cursor-pointer ${
                  isInWishlist ? "text-red-500" : ""
                }`}
              >
                {isInWishlist ? (
                  <FaBookmark size={25} className="text-indigo-700" />
                ) : (
                  <Bookmark size={25} />
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700">
              {description?.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </p>

            {/* Details */}
            <div className="text-sm flex flex-col gap-1">
              <span className="capitalize">
                <strong>Category:</strong> {category}
              </span>
              <span>
                <strong>Date:</strong> {date}
              </span>
              <span>
                <strong>Location:</strong> {location}
              </span>
              <span>
                <strong>Price:</strong> BDT {price} ৳
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center mb-4">
              <Button
                onClick={handleBookNow}
                disabled={status === "sold"}
                className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out hover:bg-indigo-800 hover:text-white bg-indigo-700 text-white"
              >
                Join Event
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
