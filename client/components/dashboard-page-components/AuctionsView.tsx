import React from 'react';
import { Auction } from '../../lib/interfaces/auction.interface';
import AuctionVerticalCard from '../shared-components/AuctionVerticalCard';
import PagePagination from '../shared-components/pagination-component/PagePagination';
interface Props {
  userAuctions?: Auction[];
  totalPages?: number;
  page: number;
  setPage: (page: number) => void;
}
const AuctionsView = ({ userAuctions, totalPages, page, setPage }: Props) => {
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
        <h1 className="text-center"> Your Auctions</h1>
        { userAuctions && userAuctions?.length > 0 ? userAuctions?.map((a: Auction) => {
          return <AuctionVerticalCard key={a.id} auction={a} />;
        }) : <p className='text-center mt-40'>it appears you still have not made an auction yet :D</p>}
        {userAuctions && userAuctions?.length > 0 && totalPages && totalPages >= 1 ? (
          <PagePagination currentPage={page} totalPages={totalPages} moveForward={moveForward} moveBackward={moveBackward} selectPage={selectPage} />
        ) : null}
      </div>
    </>
  );
};

export default AuctionsView;
