import { Item } from "../interfaces/item.interface";
import client from "./client";

export const fetchAuctionItems = async (params:{auctionId:number}): Promise<Item[]> => {
    const response = await client.get<Item[]>(
      `items/${params.auctionId}`
    );
    return response.data;
  };
