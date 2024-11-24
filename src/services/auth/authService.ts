import { tokenLoginInterface } from "@/app/api/users/interface";

async function request(
  method: string,
  requiresAuth: boolean,
  authorization?: string | null,
  body?: object | null
): Promise<Response> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (requiresAuth && authorization) {
    headers["Authorization"] = authorization;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`/api/users/autenticate`, options);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
}

export const authService = {
  login(authObject: tokenLoginInterface) {
    return request("POST", false, null, authObject);
  },
};
