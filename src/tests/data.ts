import { Coin, CoinId } from "../util/gecko";

export const BTC_ID: CoinId = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
};

export const ETH_ID: CoinId = {
  id: "ethereum",
  name: "Ethereum",
  symbol: "eth",
};

export const COIN_IDS = [BTC_ID, ETH_ID];

export const BTC_COIN: Coin = {
  ...BTC_ID,
  image: "",
  current_price: 10,
  price_change_percentage_24h: 2.5,
  ath: 12,
  ath_change_percentage: -20,
  atl: 1,
  atl_change_percentage: 1000,
  circulating_supply: 19_000,
  max_supply: 21_000,
  market_cap: 1_300_000,
  market_cap_change_percentage_24h: 2.65,
};

export const ETH_COIN: Coin = {
  ...ETH_ID,
  image: "",
  current_price: 6,
  price_change_percentage_24h: 3,
  ath: 6.6,
  ath_change_percentage: -10,
  atl: 1,
  atl_change_percentage: 6000,
  max_supply: 118_000,
  market_cap: 1_000_000,
  market_cap_change_percentage_24h: 3.2,
};

export const COINS = [BTC_COIN, ETH_COIN];
