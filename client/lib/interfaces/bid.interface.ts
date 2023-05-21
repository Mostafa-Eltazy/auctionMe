import { User } from "./user.interface";

export interface Bid {
    id: number,
    value: number,
    createdAt: number,
    updatedAt: number,
    biderId: number,
    auctionId: number,
    bider:User
  }
  