/* eslint-disable global-require */
/* eslint-disable import/extensions */
import '../styles/globals.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';
import { wrapper, store } from '../redux/store';
import mainLayout from '../layouts/mainLayout';
import authLayout from '../layouts/authLayout';

const layouts = {
  mainLayout,
  authLayout,
};

const noLayout = ({ children }) => {
  return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const Layout = layouts[Component.layout] || noLayout;

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      require('admin-lte/plugins/jquery/jquery.min.js');
      require('admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js');
      require('admin-lte/dist/js/adminlte.min.js');
      require('admin-lte/plugins/datatables/jquery.dataTables.min.js');
      require('admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js');
      require('admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js');
      require('admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js');
      require('admin-lte/plugins/datatables-buttons/js/buttons.bootstrap4.min.js');
    }
  }, []);

  useEffect(() => {
    document.body.className = pageProps.isAuth
      ? 'hold-transition login-page'
      : 'hold-transition sidebar-mini';
  });

  return (
    <>
      <ToastContainer />
      <Layout>
        <Provider store={store}>
          <NextNProgress color="#4285f4" />
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </>
  );
}

export default wrapper.withRedux(MyApp);
