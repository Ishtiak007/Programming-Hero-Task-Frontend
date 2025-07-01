type TUserId = {
  _id: string;
  name: string;
  identifier: string;
  role: string;
};

export type TEvent = {
  _id: string;
  title: string;
  description: string;
  price: number;
  date?: string;
  images: string[];
  userID?: TUserId;
  status?: "available" | "sold";
  category:
    | "wedding"
    | "birthday"
    | "corporate"
    | "concert"
    | "conference"
    | "festival"
    | "babyShower"
    | "engagement"
    | "anniversary"
    | "productLaunch";
  contactNumber: string;
  location: string;
  eventPosterName: string;
  isDeleted?: false;
  createdAt: string;
  updatedAt: string;
};
