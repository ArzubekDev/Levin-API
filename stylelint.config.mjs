/** @type {import("stylelint").Config} */
const config = {
  extends: [
    "stylelint-config-standard",
    "@dreamsicle.io/stylelint-config-tailwindcss",
  ],
  plugins: ["stylelint-order"],
  rules: {
    // Formatting ownership: Prettier handles whitespace/empty lines.
    "declaration-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "comment-empty-line-before": null,
    "rule-empty-line-before": null,
    // Tailwind/PostCSS package imports use string notation, not url().
    "import-notation": "string",
  },
  overrides: [
    {
      files: ["src/app/styles/framework.css"],
      rules: {
        // Framework wiring: syntax validity matters more than declaration order.
        "order/properties-order": null,
      },
    },
    {
      files: ["src/app/styles/tokens.css"],
      rules: {
        // Tokens are custom properties, not UI declaration blocks.
        "order/properties-order": null,
      },
    },
    {
      files: ["src/app/styles/base.css"],
      rules: {
        "order/properties-order": null,
      },
    },
    {
      files: ["src/app/styles/utilities.css", "src/app/globals.css"],
      rules: {
        "order/properties-order": [
          "content",
          "position",
          "inset",
          "top",
          "right",
          "bottom",
          "left",
          "z-index",
          "display",
          "flex",
          "flex-grow",
          "flex-shrink",
          "flex-basis",
          "grid",
          "gap",
          "width",
          "min-width",
          "max-width",
          "height",
          "min-height",
          "max-height",
          "margin",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
          "padding",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "overflow",
          "border",
          "border-radius",
          "background",
          "background-color",
          "fill",
          "stroke",
          "stroke-width",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-dasharray",
          "stroke-dashoffset",
          "color",
          "font",
          "font-size",
          "font-weight",
          "line-height",
          "text-align",
          "text-decoration",
          "white-space",
          "box-shadow",
          "opacity",
          "transform",
          "transition",
          "animation",
          "scrollbar-width",
          "scrollbar-color",
        ],
      },
    },
  ],
};

export default config;
