import React from 'react';
// import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
// import { sleep } from '../utils/sleep';
import { ControlSidebar, Header, Sidebar, Footer } from '../components';

const mainLayout = ({ children }) => {
  // const router = useRouter();
  const token = Cookies.get('token');
  // const [isAppLoaded, setIsAppLoaded] = React.useState(false);

  // const fetchProfile = async () => {
  //   try {
  //     await sleep(1000);
  //     setIsAppLoaded(true);
  //   } catch (error) {
  //     await sleep(1000);
  //     setIsAppLoaded(true);
  //   }
  // };

  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     fetchProfile();
  //   }
  // }, []);

  return (
    <>
      <div className="wrapper">
        {/* {!isAppLoaded && <Preloader />} */}

        <Header />

        <Sidebar token={token} />

        <div className="content-wrapper">{children}</div>

        <ControlSidebar />
        <Footer />
      </div>
    </>
  );
};

export default mainLayout;
