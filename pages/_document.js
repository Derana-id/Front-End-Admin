/* eslint-disable no-underscore-dangle */
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
    return (
      <Html>
        <Head />
        <body
          className={
            pageProps.isAuth
              ? 'hold-transition login-page'
              : 'hold-transition sidebar-mini'
          }
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
