import * as React from "react";

import { Global } from "@emotion/core";

import App from "next/app";
import injectGlobalStyles from "~/common/styles/global";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Global styles={injectGlobalStyles()} />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
