import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "dev-dist/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-icons",
              message:
                "Do not import from react-icons directly. Use the centralized Icon component and ICONS mapping from src/components/icons instead.",
            },
          ],
          patterns: [
            {
              group: ["react-icons/*"],
              message:
                "Do not import from react-icons subpaths directly. Use the centralized Icon component and ICONS mapping from src/components/icons instead.",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value=/^(#([A-Fa-f0-9]{3}){1,2}|rgba?\\(.*\\)|hsla?\\(.*\\))$/]",
          message:
            "Do not use hardcoded color literals (#hex, rgb, rgba, hsl). All colors must come from src/theme/theme.ts or standard Tailwind theme classes.",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] > Literal[value=/\\[#[A-Fa-f0-9]{3,8}\\]/]",
          message:
            "Do not use arbitrary hex colors in className (e.g. bg-[#...]). Use semantic Tailwind classes or tokens from src/theme/theme.ts.",
        },
        {
          selector:
            "JSXOpeningElement[name.name='Icon'] > JSXAttribute[name.name='name'] > Literal[value]",
          message:
            "Do not use string literals for icon names. Use the semantic ICONS object from src/components/icons instead.",
        },
      ],
    },
  },
  {
    files: [
      "**/theme/**",
      "**/theme.ts",
      "**/iconRegistry.ts",
      "**/Icons.tsx",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/test/**",
      "**/vite.config.ts",
      "**/vitest.config.ts",
    ],
    rules: {
      "no-restricted-syntax": "off",
      "no-restricted-imports": "off",
    },
  },
  prettierConfig,
);
