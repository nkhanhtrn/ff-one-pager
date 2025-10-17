// web-ext configuration for FF One Pager
module.exports = {
  sourceDir: 'dist',
  artifactsDir: 'web-ext-artifacts',
  verbose: true,
  run: {
    firefox: 'firefox', // or specify a custom path
    startUrl: ['about:debugging#/runtime/this-firefox']
  }
};
