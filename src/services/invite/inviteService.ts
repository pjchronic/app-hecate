import { request, requestInterface } from "../request";

function inviteApi(requestData: Omit<requestInterface, "path">) {
  const path = "/api/invite";
  return request({ ...requestData, path });
}

export const inviteService = {
  inviteUser(body: { nomeCompleto: string; email: string }, token: string) {
    return inviteApi({
      method: "POST",
      requiresAuth: true,
      authorization: token,
      body,
    });
  },
};
