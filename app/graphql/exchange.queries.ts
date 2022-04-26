import gql from "graphql-tag";

const tokenFieldsFragment = gql`
  fragment tokenFields on Token {
    id
    symbol
    name
    decimals
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
    decimals
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
    reserveUSD
    volumeUSD
  }
`;

const pairDayDataFieldsFragment = gql`
  fragment pairDayDataFields on PairDayData {
    date
    reserveUSD
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

export const getPair = gql`
  query getPair($id: ID!) {
    pair(id: $id) {
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

export const getSwaps = gql`
  query getSwaps(
    $skip: Int = 0
    $first: Int = 50
    $where: Swap_filter
    $orderBy: Swap_orderBy = timestamp
    $orderDirection: OrderDirection = desc
  ) {
    swaps(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      timestamp
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
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
