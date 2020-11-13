import * as Credentials from "~/credentials";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as Utilities from "~/common/utilities";

export const Upload = async (event, user_id, slate) => {
  //Upload an image and insert a db query
  let file = event.target.files[0];
  const slate_id = Credentials.SLATE_PRIVATE;
  const api = Credentials.SLATE_API;

  console.log("[ SLATE ID ]: ", slate_id);
  console.log("[ SLATE API ]: ", api);

  const url =
    "https://uploads.slate.host/api/public/ffca5f8c-c9c6-425e-8e49-0b8f17015bd8";
  let data = new FormData();
  data.append("data", file);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + process.env.SLATE_API,
    },
    body: data,
  });
  const json = await response.json();
  // NOTE: the URL to your asset will be available in the JSON response.
  console.log(json);

  let insert = await Actions.addToDatabase({
    user_id: user_id,
    object_id: json.data.cid,
    slate: slate_id,
  });
};
