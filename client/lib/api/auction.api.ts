import { Auction } from "../interfaces/auction.interface";
import client from "./client";

export const fetchAuctions = async (params:{limit:number, page:number}): Promise<{auctions :Auction[], count:number, limit:number}> => {
    const response = await client.get<{auctions :Auction[], count:number, limit:number}>(
      `auctions`,{params}
    );
    return response.data;
  };
  