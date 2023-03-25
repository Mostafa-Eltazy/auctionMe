import { useAtom } from 'jotai';
import { NextPage } from 'next';
import AuthGuard from '../components/shared-components/AuthGuard';
import GenericLoading from '../components/shared-components/GenericLoading';
import { userAtom, userLoadingAtom } from '../lib/atoms/user.atom';
import LandingLayout from '../components/landing-components/LandingLayout';
import Header from '../components/header-components/Header';
import Footer from '../components/footer-copmonents/Footer';

const Home: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <div>
      <AuthGuard loggedInRedirectUrl="/feed">
        {user || userLoading ? (
          <GenericLoading />
        ) : (
          <>
            <Header />
            <div className="mb-4 mt-8">
              <LandingLayout />
            </div>
            <Footer />
          </>
        )}
      </AuthGuard>
    </div>
  );
};

export default Home;
