module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/multi-word-component-names': 0, // 关闭组件没有名称定义
    'no-unused-vars': 'off',
    'vue/no-mutating-props': 0,
    'vue/no-setup-props-destructure': 0,
    'vue/no-deprecated-v-on-native-modifier': 0,
    'no-unused-expressions': 0,
    'no-irregular-whitespace': 0,
    'no-useless-escape': 0,
    camelcase: 'off',
    'vue/prefer-import-from-vue': 0,
    'prefer-const': 0
  }
}
