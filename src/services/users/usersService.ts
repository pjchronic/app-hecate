import { request, requestInterface } from "../request";

function usersApi(requestData: Omit<requestInterface, "path">) {
  const path = "/api/users";
  return request({ ...requestData, path });
}

export const usersService = {
  registerUser(body: { senha: string }, token: string) {
    return usersApi({
      method: "POST",
      requiresAuth: true,
      authorization: token,
      body,
    });
  },
  
};
