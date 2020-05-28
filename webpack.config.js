{
  module: {
    rules: [
      {
        test: /\.sharp_fdm_glover_v2\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  }
}