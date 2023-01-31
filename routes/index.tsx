import { Layout } from "../components/Layout.tsx";

const IndexPage = () => {
  return (
    <Layout title="Welcome to Mastoroute!">
      <p>
        This is a small web service to automatically redirect Mastodon users for
        share links to their instances, saved in cookies when they first
        configure the service.
      </p>

      <p>
        For web developers, all you have to do is to link to this website at
        {" "}
        <code class="text-sm tracking-tight break-all select-all">
          <span class="text-gray-600">https://mastoroute.deno.dev</span>
          <span class="text-blue-500">/share?text=&lt;your text here&gt;</span>
        </code>{" "}
        in order to route users automatically to their own Mastodon instances.
      </p>
      <p>
        For end users, go{" "}
        <a
          href="/configure"
          class="underline underline-offset-2 hover:no-underline"
        >
          here
        </a>{" "}
        to configure your instance!
      </p>

      <p class="mt-8">
        Built with{" "}
        <a
          href="https://fresh.deno.dev/"
          class="underline underline-offset-2 hover:no-underline"
          rel="noreferrer"
        >
          Fresh
        </a>{" "}
        and{" "}
        <a
          href="https://deno.land/"
          class="underline underline-offset-2 hover:no-underline"
          rel="noreferrer"
        >
          Deno
        </a>{" "}
        by{" "}
        <a
          href="https://ryanccn.dev/"
          class="underline underline-offset-2 hover:no-underline"
          rel="noreferrer"
        >
          Ryan Cao
        </a>{" "}
        •ᴗ•
      </p>
    </Layout>
  );
};

export default IndexPage;
