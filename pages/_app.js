import '../styles/globals.css';
import React, { useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
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
  const Layout = layouts[Component.layout] || noLayout;
  useEffect(() => {
    if (typeof document !== 'undefined') {
      require('admin-lte/plugins/jquery/jquery.min.js');
      require('admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js');
      require('admin-lte/dist/js/adminlte.min.js');
    }
  }, []);

  return (
    <>
      <Layout>
        <NextNProgress color="#5e50a1" />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
