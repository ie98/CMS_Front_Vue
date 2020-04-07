module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        // libraryName: 'mimt-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
