import * as React from "react";
import { css } from "react-emotion";

const STYLES_LAYOUT = css`
  //add your css here!
`;

export default class FileViewer extends React.Component {
  render() {
    let images = this.props.data;
    return (
      <div className={STYLES_LAYOUT}>
        {images.map((image, index) => (
          <img
            key={image.id}
            width="100%"
            style={{ marginRight: "4px" }}
            src={`https://slate.textile.io/ipfs/${image.object_id}`}
          />
        ))}
      </div>
    );
  }
}
