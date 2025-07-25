import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      ".react-router/**",
      "*.config.js",
      "public/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        console: "readonly",
        process: "readonly",
        window: "readonly",
        document: "readonly",
        HTMLElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLHeadingElement: "readonly",
        HTMLInputElement: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-function-type": "warn",
      "@typescript-eslint/method-signature-style": ["warn", "property"],

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General - More relaxed
      "no-console": "off", // Allow console for development
      "no-debugger": "warn",
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-undef": "off", // TypeScript handles this

      // Function Style Rules - Encourage modern practices (React-friendly)
      "prefer-arrow-callback": [
        "warn",
        {
          allowNamedFunctions: true,
          allowUnboundThis: true,
        },
      ],
      "arrow-body-style": ["warn", "as-needed"],
      "arrow-parens": ["warn", "as-needed"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "func-style": [
        "off", // Allow both function declarations and expressions for React components
      ],
      "no-var": "error",
      "object-shorthand": ["warn", "always"],
      "prefer-template": ["warn"],
      "prefer-destructuring": [
        "warn",
        {
          array: false, // Less strict for arrays
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
