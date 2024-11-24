import { tokenLoginInterface } from "@/app/api/users/interface";

async function request(method: string, body?: object): Promise<Response> {
  return fetch("/api/users/autenticate", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

export const authService = {

  login(authObject: tokenLoginInterface) {
    return request("POST", authObject);
  },
  
};
