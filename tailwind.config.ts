import { type Config } from "npm:tailwindcss";

export default {
  content: ["{routes,islands,components}/**/*.{ts,tsx}"],
  darkMode: "media",
} satisfies Config;
