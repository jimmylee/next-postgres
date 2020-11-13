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
  console.log("user: ", user);
  console.log("uploads: ", uploads);
  return (
    <React.Fragment>
      <Head>
        <title>Plate - A Slate + NextJS + Postgres boilerplate</title>
      </Head>
      <PageState data={props} />
      <div className={STYLES_LAYOUT}>
        <h1 style={{ marginTop: 24 }}>Hi, {props.viewer.data.name}!</h1> <br />
        <p style={{ fontWeight: 200, fontSize: "20px", marginTop: "8px" }}>
          Create a similar page in your app with:
        </p>
        <div
          style={{
            backgroundColor: "#27292E",
            color: "#F8F8F8",
            margin: "8px 0 32px 0",
            padding: "8px",
            borderRadius: "4px",
            fontWeight: "300",
          }}
        >
          <p>
            npm run <span style={{ color: "#FFC940" }}>make:</span>auth{" "}
            <span style={{ color: "#28A745" }}>--name</span>=ProfileSettings
          </p>
        </div>
        <p style={{ fontWeight: 300, fontSize: "24px", marginTop: "32px" }}>
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
