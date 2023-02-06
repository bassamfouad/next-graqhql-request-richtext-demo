import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  `https://caisy.io/api/v3/e/${process.env.CAISY_ID}/graphql`,
  {
    headers: {
      "x-caisy-apikey": process.env.CAISY_API_KEY,
    },
  }
);
