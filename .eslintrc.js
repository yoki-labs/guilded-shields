module.exports = {
    parserOptions: {
        project: "./tsconfig.json",
    },
    extends: "@sapphire",
    ignorePatterns: [
        "**/node_modules/**",
        "**/dist/**",
        "**/types/**",
        "**/scripts/**",
        "*.d.ts",
    ],
    rules: {
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-implied-eval": "off",
        "@typescript-eslint/no-unnecessary-qualifier": "off",
        "@typescript-eslint/no-base-to-string": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/dot-notation": "off",
    },
};
