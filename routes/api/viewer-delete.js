import * as Strings from '~/common/strings';
import * as Data from '~/common/data';
import * as Utilities from '~/common/utilities';
import * as Credentials from '~/common/credentials';

import JWT from 'jsonwebtoken';

export default async (req, res) => {
  const authorization = Utilities.parseAuthHeader(req.headers.authorization);

  if (!authorization) {
    return res.status(500).send({ error: 'viewer-delete (1)' });
  }

  const v = JWT.verify(authorization.value, Credentials.JWT_SECRET);

  if (!v || !v.email) {
    return res.status(500).send({ error: 'viewer-delete (2)' });
  }

  const user = await Data.getUserByEmail({ email: v.email });

  if (!user) {
    return res.status(500).send({ error: 'viewer-delete (3)' });
  }

  const organization = await Data.getOrganizationByUserId({ id: user.id });

  if (organization && organization.data && organization.data.ids && organization.data.ids.length === 1) {
    const co = await Data.deleteUserFromOrganizationByUserId({
      organizationId: organization.id,
      userId: user.id,
    });

    if (!co) {
      return res.status(500).send({ error: 'viewer-delete (4)' });
    }
  }

  const d = await Data.deleteUserById({ id: user.id });
  if (!d) {
    return res.status(500).send({ error: 'viewer-delete (5)' });
  }

  return res.status(200).send({ operation: true });
};
