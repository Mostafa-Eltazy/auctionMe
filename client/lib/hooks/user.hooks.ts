import { useQuery } from 'react-query';
import { fetchUserAuctions, fetchUserStats } from '../api/user.api';

export const useUserStats = (params: { userId: number | undefined }) => useQuery(['user', 'stats', params], () => fetchUserStats(params));
export const useUserAuctions = (params: { userId: number | undefined, limit : number, page : number }) => useQuery(['user', 'auctions', params], () => fetchUserAuctions(params));