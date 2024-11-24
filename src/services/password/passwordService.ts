import { redefinitionPassRequestInterface } from "@/app/api/users/interface";

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

  const response = await fetch(`/api/users/password-reset`, options);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
}

export const passwordService = {
  redefinitionRequest(body: redefinitionPassRequestInterface) {
    return request("POST", false, null, body);
  },
  redefinitionPass(body: object, auth: string) {
    return request("PATCH", true, auth, body);
  },
};
