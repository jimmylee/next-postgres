import Head from "next/head";
import Cookies from "universal-cookie";

import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import { Button } from "~/components/Buttons";

import Link from "next/link";
import CodeBox from "~/components/CodeBox";

import { css } from "react-emotion";

function Page(props) {
  const images = props.allUploads;
  const isLoggedIn = props.viewer;
  return (
    <React.Fragment>
      <Head>
        <title>Plate - A Slate + NextJS + Postgres boilerplate</title>
      </Head>
      <div style={{ height: "100vh", verticalAlign: "middle" }}>
        <h1 style={{ fontWeight: 300, fontSize: "60px" }}>
          Build decentralized <br /> apps in minutes
        </h1>

        <h2 style={{ fontWeight: 200, fontSize: "34px", marginTop: "24px" }}>
          + get{" "}
          <span>
            <Link href="https://slate.host">
              <a style={{ color: "#0666BB", textDecoration: "none" }}>50GB</a>
            </Link>
          </span>{" "}
          of free data storage.
        </h2>

        <Link
          href="#demo"
          style={{ textDecoration: "none", marginTop: "34px" }}
        >
          <a>
            <Button>See code demo</Button>
          </a>
        </Link>
        <div id="includedAnchor"></div>
      </div>
      <div
        id="demo"
        style={{
          verticalAlign: "middle",
          paddingTop: "108px",
        }}
      >
        <h2 style={{ fontWeight: "300", fontSize: "40px" }}>Demo</h2>
        <p
          style={{
            color: "#666666",
            fontSize: "20px",
            fontWeight: "200",
            paddingTop: "4px",
          }}
        >
          Get your user uploads from Slate.
        </p>
        <CodeBox text="const images = await Data.getUploads({ limit: 4 });" />
        <br />
        <div style={{ marginTop: "32px" }}>
          {images.map((image, index) => (
            <>
              <img
                width="100%"
                src={`https://slate.textile.io/ipfs/${image.object_id}`}
                key={image.object_id}
              />
            </>
          ))}
        </div>
      </div>
      <div
        id="included"
        style={{
          height: "100vh",
          verticalAlign: "middle",
          paddingTop: "108px",
        }}
      >
        <h2
          style={{
            fontWeight: "300",
            fontSize: "40px",
            marginBottom: "24px",
            display: "inline-block",
          }}
        >
          What's included
        </h2>
        <p>NextJS, Postgres + </p>
        <div
          style={{
            color: "#666666",
            fontWeight: "200",
            fontSize: "24px",
            paddingTop: "16px",
          }}
        >
          <div style={{ marginBottom: "16px" }}></div>
        </div>
        <Link href="#install">
          <a>
            <Button style={{ marginTop: "24px" }}>Create an app</Button>
          </a>
        </Link>
      </div>
      <div
        id="install"
        style={{
          height: "100vh",
          verticalAlign: "middle",
          paddingTop: "108px",
        }}
      >
        <h2 style={{ fontWeight: "300", fontSize: "40px" }}>Installation</h2>
        <p
          style={{
            color: "#666666",
            fontSize: "20px",
            fontWeight: "200",
            paddingTop: "4px",
          }}
        >
          Step one: clone the{" "}
          <Link href="/hi">
            <a style={{ textDecoration: "none", color: "#0666BB" }}>
              Github repo
            </a>
          </Link>
        </p>
        <br />
        <CodeBox text="git clone https://github.com/jasonleyser/slate-boilerplate.git" />
        <Link href="#generators">
          <a>
            <Button style={{ marginTop: "24px" }}>Create a page</Button>
          </a>
        </Link>
      </div>

      <div
        id="generators"
        style={{
          height: "100vh",
          verticalAlign: "middle",
          paddingTop: "108px",
        }}
      >
        <h2 style={{ fontWeight: "300", fontSize: "40px" }}>Generators</h2>
        <p
          style={{
            color: "#666666",
            fontSize: "20px",
            fontWeight: "200",
            paddingTop: "4px",
          }}
        >
          Quickly create pages, components and API routes.
        </p>

        <p
          style={{
            fontSize: "24px",
            fontWeight: "200",
            paddingTop: "40px",
          }}
        >
          Password protected page
        </p>
        <CodeBox text="npm run make:auth --name=PageName" />

        <p
          style={{
            fontSize: "24px",
            fontWeight: "200",
            paddingTop: "40px",
          }}
        >
          Public page
        </p>
        <CodeBox text="npm run make:page --name=PageName" />

        <p
          style={{
            fontSize: "24px",
            fontWeight: "200",
            paddingTop: "40px",
          }}
        >
          Component
        </p>
        <CodeBox text="npm run make:component --name=ComponentName" />
      </div>
      <br />
    </React.Fragment>
  );
}

Page.getInitialProps = async (ctx) => {
  return {
    googleURL: ctx.query.googleURL,
    viewer: ctx.query.viewer,
    allUploads: ctx.query.allUploads,
    error: ctx.err,
  };
};

export default Page;
