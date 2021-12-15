import React from "react";
import { render, screen } from "@testing-library/react";
import { CoinCard } from "../components/CoinCard";
import { BTC_COIN } from "./data";

test("renders basic", async () => {
  const c = BTC_COIN;
  render(<CoinCard coin={c} />);

  const img = await screen.findByAltText(/logo/);
  expect(img).toHaveAttribute("src", c.image);

  await screen.findByText(c.symbol.toUpperCase());
  await screen.findByText(c.name);
  await screen.findByText(new RegExp(c.current_price.toLocaleString()));
  await screen.findByText(
    new RegExp(c.price_change_percentage_24h.toLocaleString())
  );
});

test("renders details on click", async () => {
  const c = BTC_COIN;
  render(<CoinCard coin={c} />);

  const name = await screen.findByText(c.name);
  name.click();

  for (const n of [
    c.market_cap,
    c.market_cap_change_percentage_24h,
    c.ath,
    c.ath_change_percentage,
  ]) {
    await screen.findByText(new RegExp(n.toLocaleString()));
  }
});
