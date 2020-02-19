import * as Data from '~/common/data';

// TODO(jim): Do this based on the ruote.
export default async (req, res, app) => {
  const { viewer } = await Data.getViewer(req);
  const organization = await Data.getOrganizationByDomain({ domain: 'protocol.ai' });

  return app.render(req, res, '/organization', { viewer, organization });
};
