export interface requestInterface {
  path?: string;
  method: string;
  requiresAuth: boolean;
  authorization?: string | null;
  body?: object | null;
}

export async function request({
  path,
  method,
  requiresAuth,
  authorization,
  body,
}: requestInterface): Promise<Response> {
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

  const response = await fetch(path!, options);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
}
