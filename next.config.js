module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    ironSessionPassword: process.env.IRON_SESSION_PASSWORD
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiHost: process.env.API_HOST,
    devToken: process.env.DEMO_FW_DEV_TOKEN,
    prodToken: process.env.DEMO_FW_PROD_TOKEN,
    vercelUrl: process.env.VERCEL_URL,
    domain: process.env.DOMAIN,
    oauthHost: process.env.OAUTH_HOST,
    oauthClientId: process.env.OAUTH_CLIENT_ID
  }
}
