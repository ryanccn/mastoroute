import { ComponentChildren } from "preact";

export const Layout = (
  { title, children }: { title: string; children: ComponentChildren },
) => {
  return (
    <main class="flex flex-col gap-y-2 max-w-prose px-4 mx-auto py-36">
      <a
        href="/"
        class="text-lg font-semibold tracking-tight text-gray-500 hover:text-gray-600"
      >
        <h2>Mastoroute</h2>
      </a>
      <h1 class="text-3xl font-bold tracking-tight mb-6">{title}</h1>
      {children}
    </main>
  );
};
