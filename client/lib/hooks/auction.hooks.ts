import { useQuery } from 'react-query';
import { fetchAuctions } from '../api/auction.api';

export const useAuctions = (params:{limit:number, page:number}) => useQuery(['auctions', params], () => fetchAuctions(params));
