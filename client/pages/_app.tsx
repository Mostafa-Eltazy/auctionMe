import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { clearAuthToken, getAuthToken } from '../util/token-storage';
import { userAtom, userLoadingAtom } from '../lib/atoms/user.atom';
import { fetchUser } from '../lib/api/user.api';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-loading-skeleton/dist/skeleton.css'
import GenericLoading from '../components/shared-components/GenericLoading';
import SlidingPanel from '../components/shared-components/sliding-panel-components/SlidingPanel';
import { sliderAtom } from '../lib/atoms/slider.atom';
import Modal from '../components/shared-components/modal-components/Modal';
import { modalAtom } from '../lib/atoms/modal.atom';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);
  const [slide] = useAtom(sliderAtom)
  const [modal] = useAtom(modalAtom)


  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserLoading(true);
        try {
          const token = getAuthToken();
          if (token) {
            const data = await fetchUser();
            setUser(data);
          }
        } catch (err) {
          clearAuthToken();
        } finally {
          setUserLoading(false);
        }
      }
    };
    fetchUserData();
  }, [setUser, setUserLoading, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`app-container ${slide || modal ? 'blur ' : ''}`}>
      {userLoading ? <GenericLoading /> : <Component {...pageProps} />}
      </div>
      <SlidingPanel />
      <Modal />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default MyApp;
