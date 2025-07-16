import { ONE_MINUTE_IN_MS } from "./consts";

export function minutesToMilliseconds(minutes: number): number {
  return minutes * ONE_MINUTE_IN_MS;
}
