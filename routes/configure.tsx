import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

import { type MiddlewareState } from "./_middleware.ts";
import { Layout } from "../components/Layout.tsx";
import { FQDN_REGEX } from "../utils.ts";

interface Data {
  currentInstance: string | null;
  success?: true;
  validationError?: string;
}

export const handler: Handlers<Data, MiddlewareState> = {
  GET: async (_req, ctx) => {
    const page = await ctx.render({
      currentInstance: ctx.state.currentInstance,
    });

    return page;
  },

  POST: async (req, ctx) => {
    let parsedBody;

    try {
      parsedBody = await req.formData();
    } catch {
      return ctx.render({
        currentInstance: null,
        validationError: "Unable to parse form body!",
      });
    }

    const instanceFormValue = parsedBody.get("instance");

    if (
      typeof instanceFormValue !== "string" ||
      !FQDN_REGEX.exec(instanceFormValue)
    ) {
      return ctx.render({
        currentInstance: null,
        validationError: "Invalid instance domain provided!",
      });
    }

    const headers = new Headers();
    setCookie(headers, {
      name: "instance",
      value: instanceFormValue,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });

    const returnTo = new URL(req.url).searchParams.get("returnTo");

    if (returnTo && returnTo.startsWith("/")) {
      headers.set(
        "Location",
        returnTo,
      );
      return new Response(null, { status: 307, headers });
    }

    return ctx.render({ currentInstance: instanceFormValue, success: true });
  },
};

const ConfigurePage = ({ url, data }: PageProps<Data>) => {
  const currentInstance = data.currentInstance ?? "";
  const returnTo = url.searchParams.get("returnTo");

  return (
    <Layout title="Set your instance">
      <form class="flex flex-col gap-y-4" method="POST">
        {data.validationError && (
          <div class="bg-red-500 text-white font-medium px-4 py-3 rounded">
            {data.validationError}
          </div>
        )}
        {!data.validationError && currentInstance && (
          <div class="bg-green-500 text-white font-medium px-4 py-3 rounded">
            Your instance is correctly configured!
          </div>
        )}
        <input
          type="text"
          id="instance"
          name="instance"
          class="rounded px-3 py-2 border border-gray-300 focus:border-gray-400 focus:outline-none"
          aria-label="Instance domain"
          placeholder="mastodon.social"
          defaultValue={currentInstance}
        />
        <p class="text-gray-600">
          This instance domain will be saved in your cookies for future
          redirects.
        </p>
        <button
          type="submit"
          class="px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-400 focus:outline-none rounded self-start"
        >
          Save{returnTo && " & continue"}
        </button>
      </form>
    </Layout>
  );
};

export default ConfigurePage;
