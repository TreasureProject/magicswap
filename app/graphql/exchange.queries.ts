import gql from "graphql-tag";

const tokenFieldsFragment = gql`
  fragment tokenFields on Token {
    id
    symbol
    name
    derivedETH
  }
`;

const tokenHourDataFieldsFragment = gql`
  fragment tokenHourDataFields on TokenHourData {
    date
    volumeUSD
    priceUSD
  }
`;

const tokenDayDataFieldsFragment = gql`
  fragment tokenDayDataFields on TokenDayData {
    date
    volumeUSD
    priceUSD
  }
`;

const advancedTokenFieldsFragment = gql`
  fragment advancedTokenFields on Token {
    id
    symbol
    name
    derivedETH
    hourData(first: 24, orderBy: date, orderDirection: desc) {
      ...tokenHourDataFields
    }
    dayData(first: 7, orderBy: date, orderDirection: desc) {
      ...tokenDayDataFields
    }
  }
  ${tokenHourDataFieldsFragment}
  ${tokenDayDataFieldsFragment}
`;

const pairHourDataFieldsFragment = gql`
  fragment pairHourDataFields on PairHourData {
    date
    volumeUSD
  }
`;

const pairDayDataFieldsFragment = gql`
  fragment pairDayDataFields on PairDayData {
    date
    volumeUSD
  }
`;

const pairFieldsFragment = gql`
  fragment pairFields on Pair {
    id
    name
    reserveUSD
    reserveETH
    volumeUSD
    reserve0
    reserve1
    token0Price
    token1Price
    totalSupply
    hourData(first: 24, orderBy: date, orderDirection: desc) {
      ...pairHourDataFields
    }
    dayData(first: 7, orderBy: date, orderDirection: desc) {
      ...pairDayDataFields
    }
  }
  ${pairHourDataFieldsFragment}
  ${pairDayDataFieldsFragment}
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
  ${pairFieldsFragment}
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

export const getPairLiquidity = gql`
  query getPairLiquidity($pair: ID!, $user: String!) {
    pair(id: $pair) {
      name
      token0 {
        symbol
        derivedETH
      }
      token1 {
        symbol
        derivedETH
      }
      token0Price
      token1Price
      reserve0
      reserve1
      reserveUSD
      totalSupply
      liquidityPositions(where: { user: $user }) {
        liquidityTokenBalance
      }
    }
  }
`;

export const getSwapPairs = gql`
  query getSwapPairs(
    $where: Pair_filter
    $orderBy: Pair_orderBy = name
    $orderDirection: OrderDirection = asc
  ) {
    pairs(where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {
      token0 {
        ...tokenFields
      }
      token1 {
        ...tokenFields
      }
    }
  }
  ${tokenFieldsFragment}
`;

export const getSwapPair = gql`
  query getSwapPair($token0: String!, $token1: String!) {
    pairs(where: { token0: $token0, token1: $token1 }) {
      ...pairFields
      token0 {
        ...advancedTokenFields
      }
      token1 {
        ...advancedTokenFields
      }
    }
  }
  ${pairFieldsFragment}
  ${advancedTokenFieldsFragment}
`;
