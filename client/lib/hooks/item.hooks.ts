import { useQuery } from 'react-query';
import { fetchAuctionItems } from '../api/item.api';

export const useAuctionItems = (auctionId:number, toggled:boolean) => useQuery(['items', auctionId, toggled], () => fetchAuctionItems(auctionId), {enabled:toggled, keepPreviousData:true});
