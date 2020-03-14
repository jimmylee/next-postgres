import Head from 'next/head';

import * as React from 'react';
import * as Constants from '~/common/constants';

import { H1, H2, P } from '~/components/Text';
import { css } from 'react-emotion';

import PageState from '~/components/PageState';

const STYLES_LAYOUT = css`
  padding: 24px 24px 88px 24px;
`;

function Page(props) {
  return (
    <React.Fragment>
      <Head>
        <title>next-postgres</title>
      </Head>
      <PageState data={props} />
      {props.organization ? <H1 style={{ marginTop: 24 }}>{props.organization.data.name}</H1> : null}
      <H2 style={{ marginTop: 24 }}>
        <a href="/">View index page.</a>
      </H2>
      <H2 style={{ marginTop: 24 }}>
        <a href="/sign-in-success">View an authenticated only page.</a>
      </H2>
    </React.Fragment>
  );
}

Page.getInitialProps = async ctx => {
  return {
    error: ctx.err,
    viewer: ctx.query.viewer,
    organization: ctx.query.organization,
    data: ctx.query.data,
  };
};

export default Page;
