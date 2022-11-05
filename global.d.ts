export {};

declare global {
  namespace NodeJS {
    /**
     * Extend process.env with our custom environment variables.
     */
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      ENABLE_TESTNETS: string;
      ALCHEMY_KEY: string;
      EXCHANGE_ENDPOINT: string;
    }
  }
}
