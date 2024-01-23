declare namespace NodeJS {
  interface ProcessEnv {
    ENV: string;

    JWT_SECRET: string;

    DATABASE_URL: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_HOST: string;
    DB_PORT: string;

    MAILER_HOST: string;
    MAILER_PORT: string;
    MAILER_AUTH_USER: string;
    MAILER_AUTH_PASS: string;
  }
}
