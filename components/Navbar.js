import * as React from "react";
import Link from "next/link";

import { css } from "react-emotion";

const STYLES_NAV_LOGO = css`
  display: "flex";
  align-items: "center";
  vertical-align: "middle";
`;

const STYLES_NAV = css`
  display: "flex";
  vertical-align: "middle";
  width: 100%;
  background-color: #000;
`;

const STYLES_NAV_LOGO_TEXT = css`
  color: "#D8D8D8";
  padding-left: "4px";
  font-weight: 100;
`;

const STYLES_NAV_LOGO_LINK = css`
  text-decoration: "none";
  color: "#666666";
  margin-left: "16px";
`;

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isLoggedIn = this.props.data.__NEXT_DATA__.query.viewer;
    const googleURL = this.props.data.__NEXT_DATA__.query.googleURL;
    return (
      <>
        <div
          className={STYLES_NAV}
          style={{
            position: "-webkit-sticky",
            position: "sticky",
            top: "0",
            paddingTop: "8px",
            paddingBottom: "8px",
            backgroundColor: "#F8F8F8",
            display: "flex",
          }}
        >
          <Link href="">
            <a style={{ textDecoration: "none" }}>
              <div className={STYLES_NAV_LOGO}>
                <img
                  src="/public/slate-app-icon.png"
                  style={{ verticalAlign: "middle", borderRadius: "4px" }}
                  width="30px"
                />
                <span
                  style={{
                    color: "#27292E",
                    marginLeft: "8px",
                    paddingTop: "1px",
                    fontSize: "24px",
                    position: "absolute",
                    fontWeight: "300",
                  }}
                >
                  Plate
                </span>
              </div>
            </a>
          </Link>
          <div style={{ right: 0, position: "absolute", paddingTop: "8px" }}>
            {isLoggedIn ? (
              <>
                <Link href="/sign-in-success">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#27292E",
                      marginLeft: "16px",
                      fontWeight: "300",
                    }}
                  >
                    My Profile
                  </a>
                </Link>
                <Link href="/sign-out">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#27292E",
                      marginLeft: "16px",
                      fontWeight: "300",
                    }}
                  >
                    Logout
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href={`${googleURL}`}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#27292E",
                      fontWeight: "400",
                    }}
                  >
                    <img
                      style={{ marginRight: "8px" }}
                      src="/public/static/google.svg"
                      width="20px"
                    />
                    Sign in
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
        <br />
      </>
    );
  }
}
