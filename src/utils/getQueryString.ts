export const getQueryString = (req: Request, param: string): string => {
  try {
    const url = req.url;
    const host = req.headers.get("host");

    const parsedUrl = new URL(url, `http://${host}`);
    const valor = parsedUrl.searchParams.get(param);

    return valor!;
  } catch (error) {
    throw new Error("Erro ao coletar parametro na querystring");
  }
};
