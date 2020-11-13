import * as Data from "~/common/data";
import * as Utilities from "~/common/utilities";
import * as Credentials from "~/common/credentials";

export default async (req, res) => {
  const u = await Data.insertUploadData({
    user_id: req.body.user_id,
    object_id: req.body.object_id,
  });
  if (!u) {
    return res.status(500).send({ error: "viewer-upload-data" });
  }

  return res.status(200).send({ operation: true });
};
