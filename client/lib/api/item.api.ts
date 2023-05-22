import { Item } from "../interfaces/item.interface";
import client from "./client";

export const fetchAuctionItems = async (auctionId:number): Promise<Item[]> => {
    const response = await client.get<Item[]>(
      `items/${auctionId}`
    );
    return response.data;
  };
