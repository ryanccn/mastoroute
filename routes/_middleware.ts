import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "std/http/cookie.ts";

import { FQDN_REGEX } from "../utils.ts";

export interface MiddlewareState {
  currentInstance: string | null;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<MiddlewareState>,
) {
  const cookies = getCookies(req.headers);
  let currentInstance: string | null = cookies?.instance ?? null;

  let instanceIsInvalid = false;

  if (currentInstance && !FQDN_REGEX.exec(currentInstance)) {
    instanceIsInvalid = true;
    currentInstance = null;
  }

  ctx.state.currentInstance = currentInstance;

  const resp = await ctx.next();
  if (instanceIsInvalid) {
    setCookie(resp.headers, { name: "instance", value: "" });
  }

  return resp;
}
