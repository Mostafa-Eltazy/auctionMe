import { useQuery } from 'react-query';
import { fetchBids } from '../api/bids.api';

export const useAuctionBids = (auctionId:number,trigger:boolean) => useQuery(['bids',auctionId], () => fetchBids(auctionId),{enabled:trigger,keepPreviousData:true});
