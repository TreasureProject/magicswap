import gql from "graphql-tag";

export const getMagicPrice = gql`
  query getMagicPrice {
    bundle(id: 1) {
      ethPrice
    }
    token(id: "0x539bde0d7dbd336b79148aa742883198bbf60342") {
      derivedETH
    }
  }
`;
