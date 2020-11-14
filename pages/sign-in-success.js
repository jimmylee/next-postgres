import Head from "next/head";

import * as React from "react";
import * as Constants from "~/common/constants";
import * as Slate from "~/common/slate";

import { css } from "react-emotion";

import PageState from "~/components/PageState";
import FileViewer from "~/components/FileViewer";

const STYLES_LAYOUT = css`
  width: 100%;
`;

function Page(props) {
  const user = props.viewer;
  const uploads = props.uploads;
  console.log("[ USER_DATA ]: ", user);
  console.log("[ UPLOADS_DATA ]: ", uploads);

  return (
    <React.Fragment>
      <Head>
        <title>Plate - A Slate + NextJS + Postgres boilerplate</title>
      </Head>
      <div className={STYLES_LAYOUT}>
        <h1 style={{ marginTop: 24 }}>Hi, {props.viewer.data.name}!</h1>
        <div style={{ marginTop: 24 }}>
          <PageState data={props} />
        </div>
        <p style={{ fontWeight: 300, fontSize: 24, marginTop: 24 }}>
          My images
        </p>
        <br />
        <div id="upload-avatar">
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => Slate.Upload(event, user.id, "public")}
          />
        </div>
        <br />
        <FileViewer data={uploads} />
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
