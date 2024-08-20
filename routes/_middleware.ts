import type { FreshContext } from "$fresh/server.ts";
import { getCookies } from "@std/http/cookie";

import { FQDN_REGEX, safeDeleteCookie } from "../utils.ts";

export interface MiddlewareState {
  currentInstance: string | null;
  elk: boolean;
}

export async function handler(
  req: Request,
  ctx: FreshContext<MiddlewareState>,
) {
  const cookies = getCookies(req.headers);
  let currentInstance: string | null = cookies?.instance ?? null;

  let instanceIsInvalid = false;

  if (currentInstance && !FQDN_REGEX.exec(currentInstance)) {
    instanceIsInvalid = true;
    currentInstance = null;
  }

  ctx.state.currentInstance = currentInstance;

  let elkIsValid = false;

  if ("elk" in cookies) {
    if (cookies.elk === "1") {
      elkIsValid = true;
      ctx.state.elk = true;
    } else {
      elkIsValid = false;
      ctx.state.elk = false;
    }
  } else {
    elkIsValid = true;
    ctx.state.elk = false;
  }

  const resp = await ctx.next();

  if (!elkIsValid) {
    safeDeleteCookie(req.headers, resp.headers, "elk");
  }

  if (instanceIsInvalid) {
    safeDeleteCookie(req.headers, resp.headers, "instance");
  }

  return resp;
}
