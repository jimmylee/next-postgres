import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";

const STYLES_PAGE_STATE = css`
  font-family: "mono";
  width: 100%;
  background: ${Constants.colors.black};
  color: ${Constants.colors.white};
  font-size: 10px;
`;

const STYLES_SECTION = css`
  width: 100%;
  white-space: pre-wrap;
  padding: 24px;
`;

const STYLES_TITLE_SECTION = css`
  background: #111111;
  padding: 24px;
`;

export default class PageState extends React.Component {
  render() {
    const testData = {
      viewer: this.props.data.viewer,
      organization: this.props.data.organization,
    };
    return (
      <div css={STYLES_PAGE_STATE}>
        <div css={STYLES_TITLE_SECTION}>NEXT-POSTGRES 0.1 - DATA VIEWER</div>
        <div css={STYLES_SECTION}>{JSON.stringify(testData, null, 2)}</div>
      </div>
    );
  }
}
