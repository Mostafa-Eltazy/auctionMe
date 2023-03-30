import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Footer from '../../components/footer-copmonents/Footer';
import Header from '../../components/header-components/Header';
import AuthGuard from '../../components/shared-components/AuthGuard';
import GenericLoading from '../../components/shared-components/GenericLoading';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import { useRouter } from 'next/router';

const ExploreIndex: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);


  return (
    <>
      <AuthGuard loggedOutRedirectUrl="/">
        {!user || userLoading ? (
          <GenericLoading />
        ) : (
          <>
            <Header page='explore'/>
            <div className="mb-4">Explore Page</div>
            <Footer />
          </>
        )}
      </AuthGuard>
    </>
  );
};

export default ExploreIndex;
