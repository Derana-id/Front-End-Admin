import '../styles/globals.css';
import React, { useEffect } from 'react';
// import Script from 'next/script';
// REQUIRED SCRIPTS
// jQuery

// DATATABLES
// import 'admin-lte/plugins/datatables/jquery.dataTables.min.js';
// import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
// import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
// import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';

// Select2
// import 'admin-lte/plugins/select2/js/select2.full.min.js';

// InputMask
// import 'moment';
// import 'admin-lte/plugins/inputmask/jquery.inputmask.min';
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
      {/* <Script src="../node_modules/admin-lte/plugins/jquery/jquery.min.js" />
      <Script src="../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js" />
      <Script src="../node_modules/admin-lte/dist/js/adminlte.min.js" /> */}
      <Layout>
        <NextNProgress color="#5e50a1" />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
