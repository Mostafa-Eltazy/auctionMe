export interface Auction {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  startingBid: number;
  createdAt: string;
  updatedAt: string;
  auctioneerId: number;
  auctioneer : {username: string};
  _count? : {bids : number}
}
