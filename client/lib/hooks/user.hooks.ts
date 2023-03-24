import { useQuery } from 'react-query';
import { fetchUserStats } from '../api/user.api';

export const useUserStats = (params: { userId: number | undefined }) => useQuery(['user', 'stats', params], () => fetchUserStats(params));
