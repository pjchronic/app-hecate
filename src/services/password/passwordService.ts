import { request, requestInterface } from "../request";

function passwordApi(requestData: Omit<requestInterface, "path">) {
  const path = "/api/users/password-reset";
  return request({ ...requestData, path });
}

export const passwordService = {
  redefinitionRequest(body: { email: string; nomeCompleto: string }) {
    return passwordApi({ method: "POST", requiresAuth: false, body });
  },
  redefinitionPass(body: { senha: string }, token: string) {
    return passwordApi({
      method: "PATCH",
      requiresAuth: true,
      authorization: token,
      body,
    });
  },
};
