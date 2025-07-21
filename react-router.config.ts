import type { Config } from "@react-router/dev/config";

export default {
  // Disable SSR - chuyển về SPA mode để không cần loader
  ssr: false,
} satisfies Config;
