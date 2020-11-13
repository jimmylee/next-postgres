import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "react-emotion";

const STYLES_BUTTON_PRIMARY = css`
  background: #0666bb;
  padding: 16px;
  color: #fff;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
`;

export const Button = (props) => {
  return <button {...props} className={STYLES_BUTTON_PRIMARY} />;
};

const STYLES_BUTTON_SECONDARY = css`
  background: #0666bb;
  padding: 16px;
  color: #fff;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
`;

export const ButtonSecondary = (props) => {
  return <button {...props} className={STYLES_BUTTON_PRIMARY} />;
};
