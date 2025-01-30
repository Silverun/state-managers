module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    "nativewind/babel",
  ];
  const plugins = [
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    ["@babel/plugin-transform-private-methods", { loose: false }],
    ["@babel/plugin-transform-private-property-in-object", { loose: false }],
  ];
  const assumptions = {
    setPublicClassFields: true,
    privateFieldsAsSymbols: true,
  };

  return {
    presets,
    plugins,
    assumptions,
  };
};
