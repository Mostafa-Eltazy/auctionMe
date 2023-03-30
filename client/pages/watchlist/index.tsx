import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Footer from '../../components/footer-copmonents/Footer';
import Header from '../../components/header-components/Header';
import AuthGuard from '../../components/shared-components/AuthGuard';
import GenericLoading from '../../components/shared-components/GenericLoading';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';

const WatchlistIndex: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);


  return (
    <>
      <AuthGuard loggedOutRedirectUrl="/">
        {!user || userLoading ? (
          <GenericLoading />
        ) : (
          <>
            <Header page='watchlist'/>
            <div className="mb-4">watchlist Page</div>
            <Footer />
          </>
        )}
      </AuthGuard>
    </>
  );
};

export default WatchlistIndex;
