import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { sleep } from '../utils/sleep';
import {
  Preloader,
  ControlSidebar,
  Header,
  Sidebar,
  Footer,
} from '../components';

const mainLayout = ({ children }) => {
  const router = useRouter();
  const [isAppLoaded, setIsAppLoaded] = React.useState(false);

  const fetchProfile = async () => {
    try {
      await sleep(1000);
      setIsAppLoaded(true);
    } catch (error) {
      await sleep(1000);
      setIsAppLoaded(true);
    }
  };

  useEffect(() => {
    if (router.pathname === '/') {
      fetchProfile();
    }
  }, []);

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        {!isAppLoaded && <Preloader />}

        <Header />

        <Sidebar />

        <div className="content-wrapper">{children}</div>

        <ControlSidebar />
        <Footer />
      </div>
    </div>
  );
};

export default mainLayout;
