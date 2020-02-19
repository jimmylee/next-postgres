import signIn from '~/routes/sign-in';
import signInConfirm from '~/routes/sign-in-confirm';
import signInSuccess from '~/routes/sign-in-success';
import targetOrganization from '~/routes/target-organization';
import organization from '~/routes/organization';

import apiSignIn from '~/routes/api/sign-in';
import apiViewerDelete from '~/routes/api/viewer-delete';

module.exports = {
  signIn,
  signInConfirm,
  signInSuccess,
  organization,
  targetOrganization,
  api: {
    viewerDelete: apiViewerDelete,
    signIn: apiSignIn,
  },
};
