import * as React from "react";
import { css } from "react-emotion";

const STYLES_LAYOUT = css`
  background-color: #fff;
  color: #1b1f23;
  padding: 16px;
  padding-right: 24px;
  border-radius: 4px;
  margin-top: 16px;
  border: 1px solid #d8d8d8;
  font-family: "inter";
  width: 100%;
`;

export default class CodeBox extends React.Component {
  render() {
    return <div className={STYLES_LAYOUT}>{this.props.text}</div>;
  }
}
