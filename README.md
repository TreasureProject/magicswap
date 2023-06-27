# Magicswap UI

[Magicswap](https://magicswap.lol) is the automated market maker of the [Treasure ecosystem](https://treasure.lol).

Supporting code:

- [Solidity Contracts](https://github.com/TreasureProject/magicswap-contracts)
- [Exchange Subgraph](https://github.com/TreasureProject/treasure-subgraphs/tree/master/subgraphs/magicswap-exchange)

## Development

Create environment variables file:

```sh
cp .env.sample .env
```

Fill in the environment variables with your own API keys and enpoints.

Install dependencies:

```sh
npm install
```

Start development server:

```sh
npm run dev
```

## Contributing

### Issues/Bugs

To file a bug, please create an [issue](https://github.com/TreasureProject/magicswap/issues), providing as many details as possible.

To fix a bug, please fork the repository, make changes on your fork, then create a PR for the community and AMM Council to review.

## Deployment

Merge changes to the `main` branch to trigger a production deployment.

Merge changes to the `develop` branch to trigger a staging deployment.
