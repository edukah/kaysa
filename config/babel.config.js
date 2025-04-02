// babel.config.js (for type: "module")
export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7']
        }
      }
    ]
  ]
};

