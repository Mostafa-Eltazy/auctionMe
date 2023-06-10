import { useAtom } from 'jotai';
import React from 'react';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import { useUserAuctions } from '../../lib/hooks/user.hooks';
import { dashboardViews } from '../../util/constants';
import Footer from '../footer-copmonents/Footer';
import AuctionsView from './AuctionsView';
import BidsView from './BidsView';
import DashboardMenu from './DashboardMenu';
import SettingsView from './SettingsView';

const DashboardLayout = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);
  const [currentView, setCurrentView] = React.useState(dashboardViews[0].value);

  const { data: userAuctionsData, isLoading: userAuctionsLoading, refetch: userAuctionsRefetch } = useUserAuctions({ userId : user?.id, page: 1, limit: 10 });

  console.log(userAuctionsData)
  return (
    <div className="grid grid-cols-8">
      <DashboardMenu currentView={currentView} updateView={setCurrentView} />
      <div className="col-start-3 col-end-7 mt-5">
        {currentView === 'auctions' ? <AuctionsView /> : null}
        {currentView === 'bids' ? <BidsView /> : null}
        {currentView === 'settings' ? <SettingsView /> : null}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
