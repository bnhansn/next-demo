module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiHost: process.env.API_HOST,
    devToken: process.env.DEMO_FW_DEV_TOKEN,
    prodToken: process.env.DEMO_FW_PROD_TOKEN
  }
}
