import Image from "next/image";
import Link from "next/link";
import image from "../../../../assets/eventTwo.jpg"; // Replace with a relevant event image

const AddYourEvent = () => {
  return (
    <div className="linkItemImg bg-fixed bg-indigo-900 text-white py-16 my-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <Image
            className="rounded-md w-full max-w-md mx-auto"
            src={image}
            alt="Add Event"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 bg-black/45 p-4">
          <h2 className="uppercase text-3xl lg:text-4xl font-bold mb-4">
            Planning an Event?
          </h2>
          <p className="text-white mb-6 leading-relaxed">
            Hosting a birthday, wedding, or corporate gathering? Share your
            event with our community and manage everything in one place. Start
            by adding your event details and make it a success with our seamless
            tools and support.
          </p>
          <Link href="/user/dashboard/events/add-event">
            <button className="hover:cursor-pointer px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-indigo-700 bg-indigo-600 text-white">
              Add Your Event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddYourEvent;
