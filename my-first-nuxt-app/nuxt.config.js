module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'my-first-nuxt-app',
    // タイトル設定
    titleTemplate: '%s | Nuxt.js tag items viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  // axios追加
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    
  },
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/logger.js'
  ],
  // Qiita  アクセストークンの設定
  env: {
    QIITA_TOKEN: process.env.QIITA_TOKEN
  },
  /**
   * Middleware setting
   */
  router: {
    middleware: [
      'auth'  // 認証ミドルウェア追加
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

