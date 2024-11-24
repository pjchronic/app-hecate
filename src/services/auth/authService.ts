import { request, requestInterface } from "../request";

function authApi(requestData: Omit<requestInterface, "path">) {
  const path = "/api/users/autenticate";
  return request({ ...requestData, path });
}

export const authService = {
  login(body: { email: string; senha: string }) {
    return authApi({ method: "POST", requiresAuth: false, body });
  },
};
