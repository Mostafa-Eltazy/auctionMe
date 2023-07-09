import React from 'react';
import { Auction } from '../../lib/interfaces/auction.interface';
import { Bid } from '../../lib/interfaces/bid.interface';
import AuctionVerticalCard from '../shared-components/AuctionVerticalCard';
import BidVerticalCard from '../shared-components/BidVerticalCard';
import PagePagination from '../shared-components/pagination-component/PagePagination';
interface Props {
  userBids?: (Bid & { Auction: Auction })[];
  totalPages?: number;
  page: number;
  setPage: (page: number) => void;
}
const BidsView = ({ userBids, totalPages, page, setPage }: Props) => {
  const moveForward = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page + 1);
  };

  const moveBackward = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page - 1);
  };

  const selectPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page);
  };

  return (
    <>
      <div className="px-2 py-4">
        <h1 className="text-center"> Your Bids</h1>
        {userBids?.map((bid: Bid & {Auction : Auction}) => {
          return <BidVerticalCard key={bid.id} bid={bid}/>;
        })}
        {userBids && userBids?.length > 0 && totalPages && totalPages >= 1 ? (
          <PagePagination currentPage={page} totalPages={totalPages} moveForward={moveForward} moveBackward={moveBackward} selectPage={selectPage} />
        ) : null}
      </div>
    </>
  );
};

export default BidsView;
