import { Bid } from '../interfaces/bid.interface';
import client from './client';

export const fetchBids = async (auctionId: number): Promise<{ bids: Bid[]; count: number;}> => {
  const response = await client.get<{ bids: Bid[]; count: number; }>(`bids/${auctionId}`);
  return response.data;
};
