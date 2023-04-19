import { useQuery } from 'react-query';
import { fetchAuctionItems } from '../api/item.api';

export const useAuctionItems = (params:{auctionId:number}, toggled:boolean) => useQuery(['items', params, toggled], () => fetchAuctionItems(params), {enabled:toggled, keepPreviousData:true});
