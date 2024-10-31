import { IUser } from "./../models/user.model";
import { setCookie, parseCookies, destroyCookie } from "nookies";

export const getToken = (): string | null => {
  const cookies = parseCookies();

  return cookies["@linx.token"] || null;
};

export const getUser = (): IUser | null => {
  const cookies = parseCookies();
  const useData = cookies["@linx.user"];

  return useData ? JSON.parse(useData) : null;
};

export const setDataCookie = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  setCookie(null, key, value, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
};

export const removeAllCookies = (): void => {
  destroyCookie(null, "@linx.token");
  destroyCookie(null, "@linx.refreshToken");
  destroyCookie(null, "@linx.user");
};
