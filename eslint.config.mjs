import antfu from "@antfu/eslint-config";
import panda from "@pandacss/eslint-plugin";

export default antfu(
  {
    ignores: ["panda/", "src/env.d.ts", "/panda.config.ts", "api/"],
    stylistic: {
      quotes: "double",
      semi: true,
      overrides: {
        "comma-dangle": ["error", "always-multiline"],
        "jsonc/comma-dangle": ["error", "always-multiline"],
        "style/jsx-sort-props": "warn",
        "arrow-body-style": ["error", "as-needed"],
        "no-restricted-imports": ["error", { patterns: ["../*"] }],
        "unused-imports/no-unused-imports": "warn",
        "style/arrow-parens": ["error", "always"],
        "style/brace-style": ["error", "1tbs"],
      },
    },
    typescript: {
      parserOptions: {
        project: ["./tsconfig.json", "./scripts/tsconfig.json"],
      },
      overrides: {
        "ts/consistent-type-definitions": ["error", "type"],
        "ts/explicit-function-return-type": ["error"],
        "ts/explicit-member-accessibility": ["error"],
        "ts/naming-convention": ["error", {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        }],
        "ts/no-floating-promises": ["error"],
        "ts/no-misused-promises": ["error"],
        "ts/no-confusing-void-expression": ["error"],
        "ts/strict-boolean-expressions": ["error"],
        "ts/switch-exhaustiveness-check": ["error"],
        "ts/array-type": ["error", { default: "array-simple" }],
        "ts/no-restricted-types": [
          "error",
          { types: { Omit: "Use `OmitStrict`." } },
        ],
        "ts/no-unsafe-argument": "error",
      },
    },
    rules: {
      "antfu/no-top-level-await": "off",
    },
    react: {
      overrides: {
        "react-refresh/only-export-components": "off",
      },
    },
    astro: true,
    formatters: true,
    isInEditor: true,
  },
  {
    files: ["src/**/*.{ts,tsx,astro}"],
    plugins: {
      "@pandacss": panda,
    },
    rules: {
      ...panda.configs.recommended.rules,
    },
    settings: {
      "@pandacss/configPath": "panda.config.ts",
    },
  },
);
