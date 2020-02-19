import * as Credentials from '~/common/credentials';
import * as Utilities from '~/common/utilities';

import DB from '~/db';
import JWT, { decode } from 'jsonwebtoken';

const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;

const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn();
  } catch (e) {
    response = errorFn(e);
  }

  console.log('[ database-query ]', { query: label });
  return response;
};

export const deleteUserById = async ({ id }) => {
  return await runQuery({
    label: 'DELETE_USER_BY_ID',
    queryFn: async () => {
      const data = await DB.from('users')
        .where({ id })
        .del();

      return 1 === data;
    },
    errorFn: async e => {
      return {
        error: 'DELETE_USER_BY_ID',
        source: e,
      };
    },
  });
};

export const deleteUserFromOrganizationByUserId = async ({ organizationId, userId }) => {
  return await runQuery({
    label: 'DELETE_USER_FROM_ORGANIZATION_BY_USER_ID',
    queryFn: async () => {
      const o = await DB.select('*')
        .from('organizations')
        .where({ id: organizationId })
        .first();

      if (!o || !o.id) {
        return null;
      }

      if (o.data && o.data.ids && o.data.ids.length === 1) {
        const data = await DB.from('organizations')
          .where({ id: organizationId })
          .del();

        return 1 === data;
      }

      const data = await DB.from('organizations')
        .where('id', o.id)
        .update({
          data: {
            ...o.data,
            ids: o.data.ids.filter(each => userId !== each),
          },
        })
        .returning('*');

      const index = data ? data.pop() : null;
      return index;
    },
    errorFn: async e => {
      return {
        error: 'DELETE_USER_FROM_ORGANIZATION_BY_USER_ID',
        source: e,
      };
    },
  });
};

export const getOrganizationByUserId = async ({ id }) => {
  return await runQuery({
    label: 'GET_ORGANIZATION_BY_USER_ID',
    queryFn: async () => {
      const hasUser = userId => DB.raw(`?? @> ?::jsonb`, ['data', JSON.stringify({ ids: [userId] })]);

      const query = await DB.select('*')
        .from('organizations')
        .where(hasUser(id))
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return query;
      }

      return null;
    },
    errorFn: async e => {
      return {
        error: 'GET_ORGANIZATION_BY_USER_ID',
        source: e,
      };
    },
  });
};

export const getViewer = async (req, existingToken = undefined) => {
  let viewer = null;

  try {
    let token = existingToken;
    if (!token) {
      token = Utilities.getToken(req);
    }

    let decode = JWT.verify(token, Credentials.JWT_SECRET);
    viewer = await getUserByEmail({ email: decode.email });
  } catch (e) {}

  if (!viewer || viewer.error) {
    viewer = null;
  }

  return { viewer };
};

export const getOrganizationByDomain = async ({ domain }) => {
  return await runQuery({
    label: 'GET_ORGANIZATION_BY_DOMAIN',
    queryFn: async () => {
      const query = await DB.select('*')
        .from('organizations')
        .where({ domain })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return query;
      }

      return null;
    },
    errorFn: async e => {
      return {
        error: 'GET_ORGANIZATION_BY_DOMAIN',
        source: e,
      };
    },
  });
};

export const getUserByEmail = async ({ email }) => {
  return await runQuery({
    label: 'GET_USER_BY_EMAIL',
    queryFn: async () => {
      const query = await DB.select('*')
        .from('users')
        .where({ email })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return query;
      }

      return null;
    },
    errorFn: async e => {
      return {
        error: 'GET_USER_BY_EMAIL',
        source: e,
      };
    },
  });
};

export const createOrganization = async ({ domain, data = {} }) => {
  return await runQuery({
    label: 'CREATE_ORGANIZATION',
    queryFn: async () => {
      const query = await DB.insert({
        domain,
        data,
      })
        .into('organizations')
        .returning('*');

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async e => {
      return {
        error: 'CREATE_ORGANIZATION',
        source: e,
      };
    },
  });
};

export const createUser = async ({ email, password, salt, data = {} }) => {
  return await runQuery({
    label: 'CREATE_USER',
    queryFn: async () => {
      const query = await DB.insert({
        email,
        password,
        salt,
        data,
      })
        .into('users')
        .returning('*');

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async e => {
      return {
        error: 'CREATE_USER',
        source: e,
      };
    },
  });
};
