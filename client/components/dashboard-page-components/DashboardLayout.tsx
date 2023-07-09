import { useAtom } from 'jotai';
import React from 'react';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import { useUserAuctions, useUserBids } from '../../lib/hooks/user.hooks';
import { dashboardViews } from '../../util/constants';
import Footer from '../footer-copmonents/Footer';
import AuctionVerticalCardPlaceholde from '../loading-placeholders/AuctionVerticalCardPlaceholde';
import AuctionsView from './AuctionsView';
import BidsView from './BidsView';
import DashboardMenu from './DashboardMenu';
import SettingsView from './SettingsView';

const DashboardLayout = () => {
  const [user] = useAtom(userAtom);
  const [auctionsPage, setAuctionsPage] = React.useState(1);
  const [bidsPage, setBidsPage] = React.useState(1);

  const [currentView, setCurrentView] = React.useState(dashboardViews[0].value);

  const {
    data: userAuctionsData,
    isLoading: userAuctionsLoading,
    refetch: userAuctionsRefetch,
  } = useUserAuctions({ userId: user?.id, page: auctionsPage, limit: 3 });

  const { data: userBidsData, isLoading: userBidsLoading, refetch: userBidsRefetch } = useUserBids({ userId: user?.id, page: bidsPage, limit: 5 });

  console.log("user bids",userBidsData?.userBids);
  return (
    <div className="grid grid-cols-8">
      <DashboardMenu currentView={currentView} updateView={setCurrentView} />
      <div className="col-start-3 col-end-7 mt-5">
        {currentView === 'auctions' ? (
          userAuctionsLoading || !userAuctionsData ? (
            <AuctionVerticalCardPlaceholde />
          ) : (
            <AuctionsView
              userAuctions={userAuctionsData?.userAuctions}
              totalPages={Math.ceil(userAuctionsData?.count / userAuctionsData.limit)}
              page={auctionsPage}
              setPage={setAuctionsPage}
            />
          )
        ) : null}

        {currentView === 'bids' ? (
          userBidsLoading || !userBidsData ? (
            <AuctionVerticalCardPlaceholde />
          ) : (
            <BidsView
              userBids={userBidsData?.userBids}
              totalPages={Math.ceil(userBidsData?.count / userBidsData.limit)}
              page={bidsPage}
              setPage={setBidsPage}
            />
          )
        ) : null}
        {currentView === 'settings' ? <SettingsView /> : null}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
