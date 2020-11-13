import Head from "next/head";

import * as React from "react";
import * as Constants from "~/common/constants";
import * as Slate from "~/common/slate";

import { css } from "react-emotion";

import PageState from "~/components/PageState";

const STYLES_LAYOUT = css`
  width: 100%;
`;

function Page(props) {
  const user = props.viewer;
  const uploads = props.uploads;
  console.log("user: ", user);
  console.log("uploads: ", uploads);
  return (
    <React.Fragment>
      <Head>
        <title>Plate - A Slate + NextJS + Postgres boilerplate</title>
      </Head>
      <PageState data={props} />
      <div className={STYLES_LAYOUT}>
        <h1 style={{ marginTop: 24 }}>Hi, {props.viewer.data.name}!</h1>
      </div>
    </React.Fragment>
  );
}

Page.getInitialProps = async (ctx) => {
  return {
    error: ctx.err,
    viewer: ctx.query.viewer,
    uploads: ctx.query.uploads,
    data: ctx.query.data,
  };
};

export default Page;
