import { Head } from "$fresh/runtime.ts";
import { type ComponentChildren } from "preact";

export const Layout = (
  { title, children }: { title: string; children: ComponentChildren },
) => {
  return (
    <main class="flex flex-col gap-y-2 max-w-prose px-4 mx-auto py-36">
      <Head>
        <title>{title} · Mastoroute</title>
      </Head>

      <a
        href="/"
        class="text-lg font-semibold tracking-tight text-neutral-500 hover:text-neutral-600"
      >
        <h2>Mastoroute</h2>
      </a>
      <h1 class="text-3xl font-bold tracking-tight mb-6">{title}</h1>

      {children}
    </main>
  );
};
