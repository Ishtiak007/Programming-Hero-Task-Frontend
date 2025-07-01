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
import { zodResolver } from "@hookform/resolvers/zod";
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
import { addProductValidation } from "./addEvent.validation";
import { addEvent } from "../../../../services/EventApi";

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

export default function AddEventForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      contactNumber: "",
      date: "", // empty string as default for native date input
      location: "",
      eventPosterName: "",
      images: [{ value: "" }],
    },
    resolver: zodResolver(addProductValidation),
  });

  const { append: appendImage, fields: imageFields } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const addImage = () => {
    appendImage({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = data.images.map((image: { value: string }) => image.value);
    const modifiedData = {
      ...data,
      images,
      price: parseFloat(data.price),
      date: data.date || null, // send null if empty string
    };

    try {
      const response = await addEvent(modifiedData);
      if (response?.success) {
        toast.success("Event is added successfully");
        router.push("/user/dashboard/events");
      } else {
        toast.error(response.error?.[0]?.message || "Failed to create event");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-4 w-full mx-auto border rounded-md shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center my-5 text-indigo-800">
        Add Event
      </h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Event Title <span className="text-red-500">**</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Product title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Event Type <span className="text-red-500">**</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Asking Costs <span className="text-red-500">**</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Cost" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contact Number <span className="text-red-500">**</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your contact number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Event Date <span className="text-red-500">**</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        type="date"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className="text-red-500">**</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter event location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormItem>
                <FormLabel>
                  Attendee Count <span className="text-red-500">**</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Attendee Count" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-red-500">**</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description about this event"
                        className="w-full min-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  control={form.control}
                  name="eventPosterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Event Poster Name{" "}
                        <span className="text-red-500">**</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter event poster name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div>
            <Label>
              Images URL<span className="text-red-500">**</span>
            </Label>
            <div className="grid grid-cols-2 border rounded-md p-3 my-2">
              <div className="flex justify-center items-center">
                <button
                  className="hover:cursor-pointer border border-neutral-300 px-2 flex py-[3px] gap-3 items-center justify-center font-medium rounded-md transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:text-white my-4 mt-2 bg-zinc-100"
                  onClick={addImage}
                  type="button"
                >
                  <Plus /> Add Image Field
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {imageFields.map((imageField, index) => (
                  <div key={imageField.id}>
                    <FormField
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out bg-indigo-600 text-amber-50 hover:bg-indigo-800 hover:text-white my-4 mt-2 mx-auto"
            >
              Add Event
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
