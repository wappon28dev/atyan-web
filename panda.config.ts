import { globalCss } from "@/styles/global";
import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import pandaAnimate from "pandacss-animate";

function getPreset() {
  const { colors, ...rest } = pandaPreset.theme.tokens;

  return {
    ...pandaPreset,
    theme: {
      ...pandaPreset.theme,
      tokens: rest,
    },
  };
}

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{ts,tsx,js,jsx,astro}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: {
            value: "'M PLUS Rounded 1c', sans-serif",
          },
          mono: { value: "'UDEV Gothic 35JPDOC', monospace" },
        },
        zIndex: {
          header: { value: 10 },
          modal: { value: 100 },
          modalContent: { value: 110 },
        },
      },
      semanticTokens: {
        colors: {
          primary: { value: "#EC4051" },
          text: { value: "#4F3941" },
          bg: { value: "#FFDADF" },
          highlight: { value: "#FAABB4" },
        },
      },
    },
  },

  globalCss,

  // @ts-expect-error `pandaPreset` がなぜか型が合わない
  presets: [getPreset(), pandaAnimate],

  // The output directory for your css system
  outdir: "panda",
  jsxFramework: "react",
});
