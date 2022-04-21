import gql from "graphql-tag";

const pairFieldsQuery = gql`
  fragment pairFields on Pair {
    id
    name
    reserveUSD
    reserveETH
    volumeUSD
    untrackedVolumeUSD
    trackedReserveETH
    token0 {
      ...PairToken
    }
    token1 {
      ...PairToken
    }
    reserve0
    reserve1
    token0Price
    token1Price
    totalSupply
    txCount
    timestamp
  }
  fragment PairToken on Token {
    id
    name
    symbol
    totalSupply
    derivedETH
  }
`;

export const getEthPrice = gql`
  query getEthPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`;

export const getPairs = gql`
  query getPairs(
    $skip: Int = 0
    $first: Int = 1000
    $where: Pair_filter
    $block: Block_height
    $orderBy: Pair_orderBy = trackedReserveETH
    $orderDirection: OrderDirection = desc
  ) {
    pairs(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      ...pairFields
    }
  }
  ${pairFieldsQuery}
`;

export const getPairAnalytics = gql`
  query getPairAnalytics($pair: ID!) {
    pair(id: $pair) {
      name
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      reserveUSD
      hourData(first: 24, orderBy: date, orderDirection: desc) {
        date
        reserveUSD
        volumeUSD
      }
      swaps(first: 50, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        amount0In
        amount1In
        amount0Out
        amount1Out
        amountUSD
      }
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
