import gql from "graphql-tag";

export const getEthPrice = gql`
  query getEthPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`;

export const getPairs = gql`
  query getPairs($first: Int = 1000, $skip: Int = 0, $where: Pair_filter) {
    pairs(first: $first, skip: $skip, where: $where, orderBy: volumeUSD, orderDirection: desc) {
      id
      name
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      volumeUSD
      reserveUSD
    }
  }
`;

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
