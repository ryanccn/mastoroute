import {
  deleteCookie,
  getCookies,
  getSetCookies,
  setCookie,
} from "std/http/cookie.ts";

export const FQDN_REGEX =
  /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)/;

export const safeDeleteCookie = (
  reqHeaders: Headers,
  resHeaders: Headers,
  name: string,
) => {
  if (name in getCookies(reqHeaders)) {
    deleteCookie(resHeaders, name, { path: "/" });
  }
};

export const copySetCookies = (from: Headers, to: Headers) => {
  const fromCookies = getSetCookies(from);

  for (const cookie of fromCookies) {
    setCookie(to, cookie);
  }
};
