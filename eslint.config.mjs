import { FlatCompat } from "@eslint/eslintrc";
import storybook from "eslint-plugin-storybook";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const configs = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),

  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      "import/internal-regex": "^(@/|@storybook/)",
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/out/**",
      "**/public/**",
    ],
  },
  ...storybook.configs["flat/recommended"],
];

export default configs;
