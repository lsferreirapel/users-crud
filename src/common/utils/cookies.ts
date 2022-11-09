import Cookies from "js-cookie";

const prefix = "usersCrud";

export function getCookie(key: string) {
  return Cookies.get(`@${prefix}:${key}`);
}

export function setCookie(key: string, value: string) {
  Cookies.set(`@${prefix}:${key}`, value);
}

export function removeCookie(key: string) {
  Cookies.remove(`@${prefix}:${key}`);
}
