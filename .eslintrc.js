module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
          "singleQuote": true,
          "printWidth": 120,
          "trailingComma": "es5"
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
          "extensions": [
              ".js",
              ".jsx"
          ]
      }
  ],
  "react/prop-types": 0,
  "no-unused-vars": [
      "error",
      {
          "vars": "local",
          "args": "none"
      }
  ],
  "jsx-a11y/anchor-is-valid": [
    "error",
    {
        "components": [
            "Link"
        ],
        "specialLink": [
            "to",
            "hrefLeft",
            "hrefRight"
        ],
        "aspects": [
            "noHref",
            "invalidHref",
            "preferButton"
        ]
    }
  ],
    "no-console": "off",
    "class-methods-use-this": "off",
    "import/first": "off",
    "no-param-reassign": "off",
    "camelcase": "off"
  },
  "extends": ["airbnb", "prettier", "prettier/react"]
};
