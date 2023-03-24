import { useAtom } from 'jotai';
import { NextPage } from 'next';
import AuthGuard from '../components/shared-components/AuthGuard';
import GenericLoading from '../components/shared-components/GenericLoading';
import { userAtom, userLoadingAtom } from '../lib/atoms/user.atom';

const Home: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <div>
      <AuthGuard loggedInRedirectUrl="/feed">
        {user || userLoading ? (
          <GenericLoading />
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className=" w-full bg-white" style={{ minHeight: '100vh' }}>
              <div className="mb-4 mt-8 mx-auto">
                Welcome to auction me
              </div>
            </div>
          </div>
        )}
      </AuthGuard>
    </div>
  );
};

export default Home;
