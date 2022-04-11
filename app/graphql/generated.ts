import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

/** The block at which the query should be executed. */
export type Block_Height = {
  /** Value containing a block hash */
  hash?: InputMaybe<Scalars['Bytes']>;
  /** Value containing a block number */
  number?: InputMaybe<Scalars['Int']>;
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   *
   */
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Bundle = {
  __typename?: 'Bundle';
  ethPrice: Scalars['BigDecimal'];
  id: Scalars['ID'];
};

export type Bundle_Filter = {
  ethPrice?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_gt?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_gte?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  ethPrice_lt?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_lte?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_not?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Bundle_OrderBy {
  EthPrice = 'ethPrice',
  Id = 'id'
}

export type Burn = {
  __typename?: 'Burn';
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  complete: Scalars['Boolean'];
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeTo?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  logIndex?: Maybe<Scalars['BigInt']>;
  pair: Pair;
  sender?: Maybe<Scalars['Bytes']>;
  timestamp: Scalars['BigInt'];
  to?: Maybe<Scalars['Bytes']>;
  transaction: Transaction;
};

export type Burn_Filter = {
  amount0?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  complete?: InputMaybe<Scalars['Boolean']>;
  complete_in?: InputMaybe<Array<Scalars['Boolean']>>;
  complete_not?: InputMaybe<Scalars['Boolean']>;
  complete_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeTo?: InputMaybe<Scalars['Bytes']>;
  feeTo_contains?: InputMaybe<Scalars['Bytes']>;
  feeTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_not?: InputMaybe<Scalars['Bytes']>;
  feeTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Burn_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  Complete = 'complete',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export type DayData = {
  __typename?: 'DayData';
  date: Scalars['Int'];
  factory: Factory;
  id: Scalars['ID'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  untrackedVolume: Scalars['BigDecimal'];
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};

export type DayData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  untrackedVolume?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum DayData_OrderBy {
  Date = 'date',
  Factory = 'factory',
  Id = 'id',
  LiquidityEth = 'liquidityETH',
  LiquidityUsd = 'liquidityUSD',
  TxCount = 'txCount',
  UntrackedVolume = 'untrackedVolume',
  VolumeEth = 'volumeETH',
  VolumeUsd = 'volumeUSD'
}

export type Factory = {
  __typename?: 'Factory';
  dayData: Array<DayData>;
  hourData: Array<HourData>;
  id: Scalars['ID'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  pairCount: Scalars['BigInt'];
  pairs: Array<Pair>;
  tokenCount: Scalars['BigInt'];
  tokens: Array<Token>;
  txCount: Scalars['BigInt'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  userCount: Scalars['BigInt'];
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};


export type FactoryDayDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DayData_Filter>;
};


export type FactoryHourDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HourData_Filter>;
};


export type FactoryPairsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type FactoryTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type Factory_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pairCount?: InputMaybe<Scalars['BigInt']>;
  pairCount_gt?: InputMaybe<Scalars['BigInt']>;
  pairCount_gte?: InputMaybe<Scalars['BigInt']>;
  pairCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pairCount_lt?: InputMaybe<Scalars['BigInt']>;
  pairCount_lte?: InputMaybe<Scalars['BigInt']>;
  pairCount_not?: InputMaybe<Scalars['BigInt']>;
  pairCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenCount?: InputMaybe<Scalars['BigInt']>;
  tokenCount_gt?: InputMaybe<Scalars['BigInt']>;
  tokenCount_gte?: InputMaybe<Scalars['BigInt']>;
  tokenCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenCount_lt?: InputMaybe<Scalars['BigInt']>;
  tokenCount_lte?: InputMaybe<Scalars['BigInt']>;
  tokenCount_not?: InputMaybe<Scalars['BigInt']>;
  tokenCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  userCount?: InputMaybe<Scalars['BigInt']>;
  userCount_gt?: InputMaybe<Scalars['BigInt']>;
  userCount_gte?: InputMaybe<Scalars['BigInt']>;
  userCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  userCount_lt?: InputMaybe<Scalars['BigInt']>;
  userCount_lte?: InputMaybe<Scalars['BigInt']>;
  userCount_not?: InputMaybe<Scalars['BigInt']>;
  userCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Factory_OrderBy {
  DayData = 'dayData',
  HourData = 'hourData',
  Id = 'id',
  LiquidityEth = 'liquidityETH',
  LiquidityUsd = 'liquidityUSD',
  PairCount = 'pairCount',
  Pairs = 'pairs',
  TokenCount = 'tokenCount',
  Tokens = 'tokens',
  TxCount = 'txCount',
  UntrackedVolumeUsd = 'untrackedVolumeUSD',
  UserCount = 'userCount',
  VolumeEth = 'volumeETH',
  VolumeUsd = 'volumeUSD'
}

export type HourData = {
  __typename?: 'HourData';
  date: Scalars['Int'];
  factory: Factory;
  id: Scalars['ID'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  untrackedVolume: Scalars['BigDecimal'];
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};

export type HourData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  untrackedVolume?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum HourData_OrderBy {
  Date = 'date',
  Factory = 'factory',
  Id = 'id',
  LiquidityEth = 'liquidityETH',
  LiquidityUsd = 'liquidityUSD',
  TxCount = 'txCount',
  UntrackedVolume = 'untrackedVolume',
  VolumeEth = 'volumeETH',
  VolumeUsd = 'volumeUSD'
}

export type LiquidityPosition = {
  __typename?: 'LiquidityPosition';
  block: Scalars['Int'];
  id: Scalars['ID'];
  liquidityTokenBalance: Scalars['BigDecimal'];
  pair: Pair;
  snapshots: Array<Maybe<LiquidityPositionSnapshot>>;
  timestamp: Scalars['Int'];
  user: User;
};


export type LiquidityPositionSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LiquidityPositionSnapshot_Filter>;
};

export type LiquidityPositionSnapshot = {
  __typename?: 'LiquidityPositionSnapshot';
  block: Scalars['Int'];
  id: Scalars['ID'];
  liquidityPosition: LiquidityPosition;
  liquidityTokenBalance: Scalars['BigDecimal'];
  liquidityTokenTotalSupply: Scalars['BigDecimal'];
  pair: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  timestamp: Scalars['Int'];
  token0PriceUSD: Scalars['BigDecimal'];
  token1PriceUSD: Scalars['BigDecimal'];
  user: User;
};

export type LiquidityPositionSnapshot_Filter = {
  block?: InputMaybe<Scalars['Int']>;
  block_gt?: InputMaybe<Scalars['Int']>;
  block_gte?: InputMaybe<Scalars['Int']>;
  block_in?: InputMaybe<Array<Scalars['Int']>>;
  block_lt?: InputMaybe<Scalars['Int']>;
  block_lte?: InputMaybe<Scalars['Int']>;
  block_not?: InputMaybe<Scalars['Int']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityPosition?: InputMaybe<Scalars['String']>;
  liquidityPosition_contains?: InputMaybe<Scalars['String']>;
  liquidityPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_ends_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_gt?: InputMaybe<Scalars['String']>;
  liquidityPosition_gte?: InputMaybe<Scalars['String']>;
  liquidityPosition_in?: InputMaybe<Array<Scalars['String']>>;
  liquidityPosition_lt?: InputMaybe<Scalars['String']>;
  liquidityPosition_lte?: InputMaybe<Scalars['String']>;
  liquidityPosition_not?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_contains?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  liquidityPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_starts_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenTotalSupply?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenTotalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  token0PriceUSD?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0PriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1PriceUSD?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1PriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  user?: InputMaybe<Scalars['String']>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum LiquidityPositionSnapshot_OrderBy {
  Block = 'block',
  Id = 'id',
  LiquidityPosition = 'liquidityPosition',
  LiquidityTokenBalance = 'liquidityTokenBalance',
  LiquidityTokenTotalSupply = 'liquidityTokenTotalSupply',
  Pair = 'pair',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  Timestamp = 'timestamp',
  Token0PriceUsd = 'token0PriceUSD',
  Token1PriceUsd = 'token1PriceUSD',
  User = 'user'
}

export type LiquidityPosition_Filter = {
  block?: InputMaybe<Scalars['Int']>;
  block_gt?: InputMaybe<Scalars['Int']>;
  block_gte?: InputMaybe<Scalars['Int']>;
  block_in?: InputMaybe<Array<Scalars['Int']>>;
  block_lt?: InputMaybe<Scalars['Int']>;
  block_lte?: InputMaybe<Scalars['Int']>;
  block_not?: InputMaybe<Scalars['Int']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  user?: InputMaybe<Scalars['String']>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum LiquidityPosition_OrderBy {
  Block = 'block',
  Id = 'id',
  LiquidityTokenBalance = 'liquidityTokenBalance',
  Pair = 'pair',
  Snapshots = 'snapshots',
  Timestamp = 'timestamp',
  User = 'user'
}

export type Mint = {
  __typename?: 'Mint';
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeTo?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  logIndex?: Maybe<Scalars['BigInt']>;
  pair: Pair;
  sender?: Maybe<Scalars['Bytes']>;
  timestamp: Scalars['BigInt'];
  to: Scalars['Bytes'];
  transaction: Transaction;
};

export type Mint_Filter = {
  amount0?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeTo?: InputMaybe<Scalars['Bytes']>;
  feeTo_contains?: InputMaybe<Scalars['Bytes']>;
  feeTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_not?: InputMaybe<Scalars['Bytes']>;
  feeTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Mint_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pair = {
  __typename?: 'Pair';
  block: Scalars['BigInt'];
  burns: Array<Burn>;
  dayData: Array<PairDayData>;
  factory: Factory;
  hourData: Array<PairHourData>;
  id: Scalars['ID'];
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  liquidityProviderCount: Scalars['BigInt'];
  mints: Array<Mint>;
  name: Scalars['String'];
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveETH: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  swaps: Array<Swap>;
  timestamp: Scalars['BigInt'];
  token0: Token;
  token0Price: Scalars['BigDecimal'];
  token1: Token;
  token1Price: Scalars['BigDecimal'];
  totalSupply: Scalars['BigDecimal'];
  trackedReserveETH: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};


export type PairBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type PairDayDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairDayData_Filter>;
};


export type PairHourDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairHourData_Filter>;
};


export type PairLiquidityPositionSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LiquidityPositionSnapshot_Filter>;
};


export type PairLiquidityPositionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LiquidityPosition_Filter>;
};


export type PairMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type PairSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type PairDayData = {
  __typename?: 'PairDayData';
  date: Scalars['Int'];
  id: Scalars['ID'];
  pair: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  token0: Token;
  token1: Token;
  totalSupply: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};

export type PairDayData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PairDayData_OrderBy {
  Date = 'date',
  Id = 'id',
  Pair = 'pair',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  Token0 = 'token0',
  Token1 = 'token1',
  TotalSupply = 'totalSupply',
  TxCount = 'txCount',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export type PairHourData = {
  __typename?: 'PairHourData';
  date: Scalars['Int'];
  id: Scalars['ID'];
  pair: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};

export type PairHourData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PairHourData_OrderBy {
  Date = 'date',
  Id = 'id',
  Pair = 'pair',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  TxCount = 'txCount',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export type Pair_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityProviderCount?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_gt?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_gte?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidityProviderCount_lt?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_lte?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_not?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveETH?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0Price?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1Price?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trackedReserveETH?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trackedReserveETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_not?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Pair_OrderBy {
  Block = 'block',
  Burns = 'burns',
  DayData = 'dayData',
  Factory = 'factory',
  HourData = 'hourData',
  Id = 'id',
  LiquidityPositionSnapshots = 'liquidityPositionSnapshots',
  LiquidityPositions = 'liquidityPositions',
  LiquidityProviderCount = 'liquidityProviderCount',
  Mints = 'mints',
  Name = 'name',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveEth = 'reserveETH',
  ReserveUsd = 'reserveUSD',
  Swaps = 'swaps',
  Timestamp = 'timestamp',
  Token0 = 'token0',
  Token0Price = 'token0Price',
  Token1 = 'token1',
  Token1Price = 'token1Price',
  TotalSupply = 'totalSupply',
  TrackedReserveEth = 'trackedReserveETH',
  TxCount = 'txCount',
  UntrackedVolumeUsd = 'untrackedVolumeUSD',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  dayData?: Maybe<DayData>;
  dayDatas: Array<DayData>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  hourData?: Maybe<HourData>;
  hourDatas: Array<HourData>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairs: Array<Pair>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokenHourData?: Maybe<TokenHourData>;
  tokenHourDatas: Array<TokenHourData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryBundleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBundlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bundle_Filter>;
};


export type QueryBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
};


export type QueryDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DayData_Filter>;
};


export type QueryFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};


export type QueryFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourData_Filter>;
};


export type QueryLiquidityPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLiquidityPositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLiquidityPositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidityPositionSnapshot_Filter>;
};


export type QueryLiquidityPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidityPosition_Filter>;
};


export type QueryMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};


export type QueryPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPairDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPairDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PairDayData_Filter>;
};


export type QueryPairHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPairHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PairHourData_Filter>;
};


export type QueryPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pair_Filter>;
};


export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenDayData_Filter>;
};


export type QueryTokenHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenHourData_Filter>;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  dayData?: Maybe<DayData>;
  dayDatas: Array<DayData>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  hourData?: Maybe<HourData>;
  hourDatas: Array<HourData>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairs: Array<Pair>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokenHourData?: Maybe<TokenHourData>;
  tokenHourDatas: Array<TokenHourData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionBundleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBundlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bundle_Filter>;
};


export type SubscriptionBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
};


export type SubscriptionDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DayData_Filter>;
};


export type SubscriptionFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};


export type SubscriptionFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourData_Filter>;
};


export type SubscriptionLiquidityPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLiquidityPositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLiquidityPositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidityPositionSnapshot_Filter>;
};


export type SubscriptionLiquidityPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidityPosition_Filter>;
};


export type SubscriptionMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};


export type SubscriptionPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPairDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPairDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PairDayData_Filter>;
};


export type SubscriptionPairHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPairHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PairHourData_Filter>;
};


export type SubscriptionPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pair_Filter>;
};


export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenDayData_Filter>;
};


export type SubscriptionTokenHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenHourData_Filter>;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Swap = {
  __typename?: 'Swap';
  amount0In: Scalars['BigDecimal'];
  amount0Out: Scalars['BigDecimal'];
  amount1In: Scalars['BigDecimal'];
  amount1Out: Scalars['BigDecimal'];
  amountUSD: Scalars['BigDecimal'];
  id: Scalars['ID'];
  logIndex?: Maybe<Scalars['BigInt']>;
  pair: Pair;
  sender: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
  to: Scalars['Bytes'];
  transaction: Transaction;
};

export type Swap_Filter = {
  amount0In?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0In_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0Out?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0Out_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1In?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1In_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1Out?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1Out_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Swap_OrderBy {
  Amount0In = 'amount0In',
  Amount0Out = 'amount0Out',
  Amount1In = 'amount1In',
  Amount1Out = 'amount1Out',
  AmountUsd = 'amountUSD',
  Id = 'id',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export type Token = {
  __typename?: 'Token';
  basePairs: Array<Pair>;
  basePairsDayData: Array<PairDayData>;
  dayData: Array<TokenDayData>;
  decimals: Scalars['BigInt'];
  derivedETH: Scalars['BigDecimal'];
  factory: Factory;
  hourData: Array<TokenHourData>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  name: Scalars['String'];
  quotePairs: Array<Pair>;
  quotePairsDayData: Array<PairDayData>;
  symbol: Scalars['String'];
  totalSupply: Scalars['BigInt'];
  txCount: Scalars['BigInt'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  volume: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  whitelistPairs: Array<Pair>;
};


export type TokenBasePairsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type TokenBasePairsDayDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairDayData_Filter>;
};


export type TokenDayDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TokenDayData_Filter>;
};


export type TokenHourDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TokenHourData_Filter>;
};


export type TokenQuotePairsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type TokenQuotePairsDayDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairDayData_Filter>;
};


export type TokenWhitelistPairsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};

export type TokenDayData = {
  __typename?: 'TokenDayData';
  date: Scalars['Int'];
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  priceUSD: Scalars['BigDecimal'];
  token: Token;
  txCount: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};

export type TokenDayData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TokenDayData_OrderBy {
  Date = 'date',
  Id = 'id',
  Liquidity = 'liquidity',
  LiquidityEth = 'liquidityETH',
  LiquidityUsd = 'liquidityUSD',
  PriceUsd = 'priceUSD',
  Token = 'token',
  TxCount = 'txCount',
  Volume = 'volume',
  VolumeEth = 'volumeETH',
  VolumeUsd = 'volumeUSD'
}

export type TokenHourData = {
  __typename?: 'TokenHourData';
  date: Scalars['Int'];
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  priceUSD: Scalars['BigDecimal'];
  token: Token;
  txCount: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};

export type TokenHourData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TokenHourData_OrderBy {
  Date = 'date',
  Id = 'id',
  Liquidity = 'liquidity',
  LiquidityEth = 'liquidityETH',
  LiquidityUsd = 'liquidityUSD',
  PriceUsd = 'priceUSD',
  Token = 'token',
  TxCount = 'txCount',
  Volume = 'volume',
  VolumeEth = 'volumeETH',
  VolumeUsd = 'volumeUSD'
}

export type Token_Filter = {
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  derivedETH?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  derivedETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_not?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  whitelistPairs?: InputMaybe<Array<Scalars['String']>>;
  whitelistPairs_contains?: InputMaybe<Array<Scalars['String']>>;
  whitelistPairs_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  whitelistPairs_not?: InputMaybe<Array<Scalars['String']>>;
  whitelistPairs_not_contains?: InputMaybe<Array<Scalars['String']>>;
  whitelistPairs_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Token_OrderBy {
  BasePairs = 'basePairs',
  BasePairsDayData = 'basePairsDayData',
  DayData = 'dayData',
  Decimals = 'decimals',
  DerivedEth = 'derivedETH',
  Factory = 'factory',
  HourData = 'hourData',
  Id = 'id',
  Liquidity = 'liquidity',
  Name = 'name',
  QuotePairs = 'quotePairs',
  QuotePairsDayData = 'quotePairsDayData',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
  TxCount = 'txCount',
  UntrackedVolumeUsd = 'untrackedVolumeUSD',
  Volume = 'volume',
  VolumeUsd = 'volumeUSD',
  WhitelistPairs = 'whitelistPairs'
}

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt'];
  burns: Array<Maybe<Burn>>;
  id: Scalars['ID'];
  mints: Array<Maybe<Mint>>;
  swaps: Array<Maybe<Swap>>;
  timestamp: Scalars['BigInt'];
};


export type TransactionBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type TransactionMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type TransactionSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type Transaction_Filter = {
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burns?: InputMaybe<Array<Scalars['String']>>;
  burns_contains?: InputMaybe<Array<Scalars['String']>>;
  burns_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  burns_not?: InputMaybe<Array<Scalars['String']>>;
  burns_not_contains?: InputMaybe<Array<Scalars['String']>>;
  burns_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  mints?: InputMaybe<Array<Scalars['String']>>;
  mints_contains?: InputMaybe<Array<Scalars['String']>>;
  mints_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  mints_not?: InputMaybe<Array<Scalars['String']>>;
  mints_not_contains?: InputMaybe<Array<Scalars['String']>>;
  mints_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  swaps?: InputMaybe<Array<Scalars['String']>>;
  swaps_contains?: InputMaybe<Array<Scalars['String']>>;
  swaps_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  swaps_not?: InputMaybe<Array<Scalars['String']>>;
  swaps_not_contains?: InputMaybe<Array<Scalars['String']>>;
  swaps_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  Burns = 'burns',
  Id = 'id',
  Mints = 'mints',
  Swaps = 'swaps',
  Timestamp = 'timestamp'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  liquidityPositions: Array<LiquidityPosition>;
};


export type UserLiquidityPositionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LiquidityPosition_Filter>;
};

export type User_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum User_OrderBy {
  Id = 'id',
  LiquidityPositions = 'liquidityPositions'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetTokenPriceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTokenPriceQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPrice: any } | null, token?: { __typename?: 'Token', id: string, derivedETH: any } | null };


export const GetTokenPriceDocument = gql`
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getTokenPrice(variables: GetTokenPriceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTokenPriceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTokenPriceQuery>(GetTokenPriceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTokenPrice', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;