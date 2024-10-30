/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRole } from "../models/role.model";
import { IUser } from "./../models/user.model";
import { setCookie, parseCookies, destroyCookie } from "nookies";

export const getWelcome = (): string | null => {
  const cookies = parseCookies();

  return cookies["@linx.welcome"] || null;
};

export const getToken = (): string | null => {
  const cookies = parseCookies();

  return cookies["@linx.token"] || null;
};

export const getRefreshToken = (): string | null => {
  const cookies = parseCookies();

  return cookies["@linx.refreshToken"] || null;
};

export const getUser = (): IUser | null => {
  const cookies = parseCookies();
  const useData = cookies["@linx.user"];

  return useData ? JSON.parse(useData) : null;
};

export const getRole = (): IRole | null => {
  const cookies = parseCookies();
  const roleData = cookies["@linx.role"];

  return roleData ? JSON.parse(roleData) : null;
};

export const getRoles = (): IRole[] | [] => {
  const cookies = parseCookies();
  const rolesData = cookies["@linx.roles"];

  return rolesData ? JSON.parse(rolesData) : [];
};

export const getCompany = (): any | null => {
  const cookies = parseCookies();
  const companyData = cookies["@linx.company"];

  return companyData ? JSON.parse(companyData) : null;
};

export const getCompanies = (): any | null => {
  const cookies = parseCookies();
  const companyData = cookies["@linx.companies"];

  return companyData ? JSON.parse(companyData) : [];
};

export const getPermissions = (): any | null => {
  const cookies = parseCookies();
  const permissionsData = cookies["@linx.permissions"];

  return permissionsData ? JSON.parse(permissionsData) : [];
};

export const getUseTerm = (): any | null => {
  const cookies = parseCookies();
  const termData = cookies["@linx.term"];

  return termData ? JSON.parse(termData) : [];
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
  destroyCookie(null, "@linx.welcome");
  destroyCookie(null, "@linx.token");
  destroyCookie(null, "@linx.refreshToken");
  destroyCookie(null, "@linx.user");
  destroyCookie(null, "@linx.role");
  destroyCookie(null, "@linx.roles");
  destroyCookie(null, "@linx.company");
  destroyCookie(null, "@linx.companies");
  destroyCookie(null, "@linx.permissions");
  destroyCookie(null, "@linx.term");
};
