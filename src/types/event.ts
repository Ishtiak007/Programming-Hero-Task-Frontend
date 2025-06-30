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
  location: string;
  contactNumber: string;
  isDeleted?: false;
  createdAt: string;
  updatedAt: string;
};
