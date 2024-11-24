export interface loginInterface {
  email: string;
  senha: string;
}

export interface tokenLoginInterface {
  accessToken: string;
  refreshToken: string;
}

export interface redefinitionPassRequestInterface {
  email: string;
  nomeCompleto: string;
}
