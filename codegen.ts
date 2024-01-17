import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "./app/graphql/exchange.generated.ts": {
      schema: process.env.MAGICSWAP_API_URL,
      documents: "./app/graphql/exchange.queries.ts",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
