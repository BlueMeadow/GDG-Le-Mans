const webpack = require('webpack');

module.exports = {
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      MEETUP_API_URL: JSON.stringify(process.env.MEETUPAPI),
      TAG_API_URL: JSON.stringify(process.env.TAGAPI),
      KEYCLOAK_AUTH_SERVER_URL: JSON.stringify(process.env.KEYCLOAK_AUTH_SERVER_URL),
      KEYCLOAK_PRINCIPAL_ATTRIBUTE: JSON.stringify(process.env.KEYCLOAK_PRINCIPAL_ATTRIBUTE),
      KEYCLOAK_REALM_NAME: JSON.stringify(process.env.KEYCLOAK_REALM_NAME),
      KEYCLOAK_RESOURCE_NAME: JSON.stringify(process.env.KEYCLOAK_RESOURCE_NAME),
      KEYCLOAK_SSL_REQUIRED: JSON.stringify(process.env.KEYCLOAK_SSL_REQUIRED),
      KEYCLOAK_PUBLIC_CLIENT: JSON.stringify(process.env.KEYCLOAK_PUBLIC_CLIENT),
      KEYCLOAK_CREDENTIALS_SECRET: JSON.stringify(process.env.KEYCLOAK_CREDENTIALS_SECRET),
      KEYCLOAK_USE_RESOURCE_ROLE: JSON.stringify(process.env.KEYCLOAK_USE_RESOURCE_ROLE),
    }
  })]
};
