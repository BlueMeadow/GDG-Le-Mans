declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  MEETUP_API_URL: string;
  TAG_API_URL: string;
  KEYCLOAK_AUTH_SERVER_URL: string;
  KEYCLOAK_PRINCIPAL_ATTRIBUTE: string;
  KEYCLOAK_REALM_NAME: string;
  KEYCLOAK_RESOURCE_NAME: string;
  KEYCLOAK_SSL_REQUIRED: string;
  KEYCLOAK_PUBLIC_CLIENT: string;
  KEYCLOAK_CREDENTIALS_SECRET: string;
  KEYCLOAK_USE_RESOURCE_ROLE: string;
}

interface GlobalEnvironment {
  process: Process;
}
