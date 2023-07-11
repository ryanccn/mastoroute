import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

import { MiddlewareState } from "../_middleware.ts";
import { safeDeleteCookie } from "../../utils.ts";

export const handler: Handlers<unknown, MiddlewareState> = {
  POST: (req) => {
    const headers = new Headers();
    headers.set("location", "/configure");
    setCookie(headers, {
      name: "elk",
      value: "1",
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });
    safeDeleteCookie(req.headers, headers, "instance");

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
