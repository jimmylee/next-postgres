import * as Data from "~/common/data";

export default async (req, res, app) => {
  const { viewer } = await Data.getViewer(req);
  //get uploads from user id
  let id = viewer.id;
  let uploads = await Data.getUserUploads({
    type: "image",
    user_id: id,
  });

  if (!viewer || viewer.error) {
    return app.render(req, res, "/sign-in-error", { viewer: null });
  }

  return app.render(req, res, "/sign-in-success", { viewer, uploads });
};
