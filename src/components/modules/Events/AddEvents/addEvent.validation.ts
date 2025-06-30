import { z } from "zod";

export const addProductValidation = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  date: z
    .string()
    .min(1, "Event date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  location: z.string().min(1, "Location is required"),
  images: z
    .array(z.object({ value: z.string().min(1, "Image URL is required") }))
    .min(1, "At least one image is required"),
});
