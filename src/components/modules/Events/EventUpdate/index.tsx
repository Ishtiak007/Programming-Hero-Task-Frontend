"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Textarea } from "../../../ui/textarea";
import { Plus } from "lucide-react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TEvent } from "../../../../types/event";
import { updateProductById } from "../../../../services/EventApi";

const categoryOptions = [
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday" },
  { value: "corporate", label: "Corporate" },
  { value: "concert", label: "Concert" },
  { value: "conference", label: "Conference" },
  { value: "festival", label: "Festival" },
  { value: "babyShower", label: "Baby Shower" },
  { value: "engagement", label: "Engagement" },
  { value: "anniversary", label: "Anniversary" },
  { value: "productLaunch", label: "Product Launch" },
];

export default function EventUpdateForm({ event }: { event: TEvent }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      price: event?.price || "",
      category: event?.category || "",
      contactNumber: event?.contactNumber || "",
      date: event?.date || "",
      location: event?.location || "",
      images: event?.images?.map((image) => ({ value: image })) || [
        { value: "" },
      ],
    },
  });

  const { append: appendImage, fields: imageFields } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const addImage = () => {
    appendImage({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = data.images.map((img: { value: string }) => img.value);
    const modifiedData = {
      ...data,
      images,
      price: parseFloat(data.price),
    };

    try {
      const response = await updateProductById(event._id, modifiedData);
      if (response?.success) {
        toast.success("Event updated successfully");
        router.push("/user/dashboard/events");
      } else {
        toast.error(response.error?.[0]?.message || "Update failed");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-4 w-full mx-auto border rounded-md shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center my-5 text-indigo-800">
        Update Event - <span className="text-blue-800">({event.title})</span>
      </h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter event title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter cost" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter contact number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[150px]"
                    placeholder="Enter event description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label>Images URL</Label>
            <div className="grid grid-cols-2 border rounded-md p-3 my-2">
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={addImage}
                  className="border px-2 py-[3px] rounded-md bg-zinc-100 hover:bg-indigo-700 hover:text-white"
                >
                  <Plus /> Add Image
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {imageFields.map((imageField, index) => (
                  <FormField
                    key={imageField.id}
                    control={form.control}
                    name={`images.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL ({index + 1})</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="px-4 cursor-pointer  py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-800"
            >
              Update Event
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
