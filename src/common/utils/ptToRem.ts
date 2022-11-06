import { BASE_PX } from "../constants";

export function pxToRem(px: number): string {
  return `${px / BASE_PX}rem`;
}

export const pr = pxToRem;
