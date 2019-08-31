module.exports = {
  presets: [
    "@babel/preset-env", // responsible to change the JS functionalities that the browsers does not understand (arrow functions, import/export, and so on)
    "@babel/preset-react" // will make browser understant JSX files and particular functionalities from React
  ],
  plugins: ["@babel/plugin-proposal-class-properties"]
};
