module.exports = {

  env: {
    es2021: true,
    es6: true,
    "react-native/react-native": true
  },

  extends: [
    'airbnb-base',
    "plugin:react-native/all"
  ],

  plugins: [
    "react",
    "react-native"
  ],

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      "jsx": true
    }
  },

  ignorePatterns: ['node_modules/'],

  rules: {
    // react native eslint 提供的規則
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,

    // react-native Off
    "react-native/sort-styles": 0, // style 排序
    "react-native/no-color-literals": 0, // 文字顏色的檢查 "red"
    "react-native/no-unused-styles": 0, // 未使用的樣式 (JS內使用的不會被判斷到)
    "react-native/no-inline-styles": 0, // JSX 不允許 inline style
    "global-require": 0, // 不關閉使用 <Image> 時會出警告
    "react-native/no-raw-text": 'warn',

    // Custom
    'semi': ['error', 'never'], // 結尾分號
    'comma-dangle': 'off',
    'no-trailing-spaces': 'warn',
    'no-use-before-define': 'off', // 同檔案被使用的 Function 必須位於 使用者的上方
    'arrow-body-style': 'warn',

    // 使用 XXX.ios.js 時 ESLint 判斷錯誤,
    'import/extensions': 'warn',
    'import/no-unresolved': 'warn',

    // 開發用
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    'padded-blocks': 'off',
    'no-unused-vars': 'off', // 沒使用到變數
    'no-console': 'off',
  },
}
