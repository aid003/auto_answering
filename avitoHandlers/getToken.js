import { getAccessToken } from "./paramsInterface.js";

export async function getToken() {
  const request = await fetch("https://api.avito.ru/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(getAccessToken),
    json: true,
  }).then((data) => data.json());

  return request.access_token;
}
