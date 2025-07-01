import { TEvent } from "./event";

type TBuyerId = {
  _id: string;
  name: string;
  identifier: string;
  role: string;
};

type TSellerId = Pick<TBuyerId, keyof TBuyerId>;

export type TOrder = {
  _id: string;
  buyerID: TBuyerId;
  sellerID: TSellerId;
  itemID: TEvent;
  status?: "pending" | "sold";
  paymentMethod?: "online";
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
};
