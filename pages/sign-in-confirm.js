import Head from "next/head";
import Cookies from "universal-cookie";

import * as React from "react";
import * as Constants from "~/common/constants";

import { H1, H2, P } from "~/components/Text";
import { css } from "react-emotion";

import PageState from "~/components/PageState";

const cookies = new Cookies();

const STYLES_LAYOUT = css`
  width: 100%;
`;

function Page(props) {
  React.useEffect(() => {
    if (props.jwt) {
      cookies.set(Constants.session.key, props.jwt);
      return;
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>next-postgres</title>
      </Head>
      <PageState data={props} />
      <div className={STYLES_LAYOUT}>
        <h1 style={{ marginTop: 24 }}>Sign in confirm</h1>
        <h2 style={{ marginTop: 24 }}>
          <a href="/">View index page.</a>
        </h2>
        <h2 style={{ marginTop: 24 }}>
          <a href="/sign-in-success">View an authenticated page.</a>
        </h2>
      </div>
    </React.Fragment>
  );
}

Page.getInitialProps = async (ctx) => {
  return {
    error: ctx.err,
    viewer: ctx.query.viewer,
    jwt: ctx.query.jwt,
  };
};

export default Page;
