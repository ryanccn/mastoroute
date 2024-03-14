import { defineConfig } from "twind";

import presetTailwind from "@twind/preset-tailwind";
// import presetTailwindForms from "@twind/preset-tailwind-forms";
import presetAutoprefix from "@twind/preset-autoprefix";

export default {
  ...defineConfig({
    presets: [
      presetTailwind(),
      presetAutoprefix(),
    ],
  }),
  selfURL: import.meta.url,
};
