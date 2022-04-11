import gql from "graphql-tag";

export const getTokenPrice = gql`
  query getTokenPrice($id: ID!) {
    bundle(id: "1") {
      ethPrice
    }
    token(id: $id) {
      id
      derivedETH
    }
  }
`;
