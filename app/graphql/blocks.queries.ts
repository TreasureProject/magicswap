import gql from "graphql-tag";

export const getBlocks = gql`
  query getBlocks(
    $where: Block_filter
    $orderBy: Block_orderBy! = timestamp
    $orderDirection: OrderDirection! = desc
  ) {
    blocks(
      first: 1
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      number
      timestamp
    }
  }
`;
