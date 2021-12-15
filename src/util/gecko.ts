const geckoUri = "https://api.coingecko.com/api/v3";

export type OnError = (error: string) => void;

const get = async <T>(
  url: string,
  onError: OnError,
  defaultValue: T,
  params?: Record<string, string>
): Promise<T> => {
  const resp = await fetch(
    url + (params ? "?" + new URLSearchParams(params) : "")
  );
  if (resp.ok) return await resp?.json();

  onError(resp.statusText);
  return defaultValue;
};

export const CURRENCY = "aud";
export const CURRENCY_SYMBOL = "$";

export interface CoinId {
  id: string;
  symbol: string;
  name: string;
}

export interface Coin extends CoinId {
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  ath: number;
  ath_change_percentage: number;
  atl: number;
  atl_change_percentage: number;
  circulating_supply?: number;
  max_supply?: number;
  market_cap: number;
  market_cap_change_percentage_24h: number;
}

export const FETCH_COINS_URL = `${geckoUri}/coins/markets`;

export const fetchCoins = async (
  page: number,
  pageSize: number,
  ids: string[],
  onError: OnError
): Promise<Coin[]> =>
  get(FETCH_COINS_URL, onError, [], {
    vs_currency: CURRENCY,
    order: "market_cap_desc",
    ids: ids.join(","),
    page: `${page}`,
    per_page: `${pageSize}`,
  });

export const FETCH_COIN_IDS_URL = `${geckoUri}/coins/list`;

export const fetchCoinIds = async (onError: OnError): Promise<CoinId[]> =>
  get(FETCH_COIN_IDS_URL, onError, []);
