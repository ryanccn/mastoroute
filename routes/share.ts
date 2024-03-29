import type { Handlers } from "$fresh/server.ts";
import type { MiddlewareState } from "./_middleware.ts";

export const handler: Handlers<unknown, MiddlewareState> = {
  GET: (req, ctx) => {
    const { currentInstance: instance, elk } = ctx.state;

    if (!instance && !elk) {
      const currentURL = new URL(req.url);

      return new Response(null, {
        status: 307,
        headers: {
          Location: `/configure?returnTo=${
            encodeURIComponent(currentURL.pathname + currentURL.search)
          }`,
        },
      });
    }

    const text = new URL(req.url).searchParams.get("text");

    if (!text) {
      return new Response("400 Bad Request", {
        status: 400,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    const redirectURL = new URL(
      elk ? "https://elk.zone/intent/post" : `https://${instance}/share`,
    );
    redirectURL.searchParams.set("text", text);

    return new Response(null, {
      status: 303,
      headers: { Location: redirectURL.toString() },
    });
  },
};
