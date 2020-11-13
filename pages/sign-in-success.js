import Head from "next/head";

import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "react-emotion";

import PageState from "~/components/PageState";

const STYLES_LAYOUT = css`
  width: 100%;
`;

function Page(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Plate - A Slate + NextJS + Postgres boilerplate</title>
      </Head>
      <PageState data={props} />
      <div className={STYLES_LAYOUT}>
        <h1 style={{ marginTop: 24 }}>You can only see this authenticated.</h1>
        <h2 style={{ marginTop: 24 }}>
          <a href="/">View index page.</a>
        </h2>
        <h2 style={{ marginTop: 24 }}>
          <a href="/">Return to sign in page.</a>
        </h2>
        <h2 style={{ marginTop: 24 }}>
          <a href="/sign-out">Sign out.</a>
        </h2>
      </div>
    </React.Fragment>
  );
}

Page.getInitialProps = async (ctx) => {
  return {
    error: ctx.err,
    viewer: ctx.query.viewer,
    data: ctx.query.data,
  };
};

export default Page;
