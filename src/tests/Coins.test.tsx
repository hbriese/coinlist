import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Coins } from "../components/Coins";
import { FETCH_COINS_URL, FETCH_COIN_IDS_URL } from "../util/gecko";
import { COIN_IDS, COINS } from "./data";

const server = setupServer(
  rest.get(FETCH_COIN_IDS_URL, (req, res, ctx) => res(ctx.json(COIN_IDS))),
  rest.get(FETCH_COINS_URL, (req, res, ctx) => res(ctx.json(COINS)))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders coins", async () => {
  render(<Coins />);

  for (const c of COINS) {
    await screen.findByText(c.name);
  }
});

test("shows fetch error", async () => {
  const errorMsg = "fetch error";
  server.use(
    rest.get(FETCH_COINS_URL, (req, res, ctx) => res(ctx.status(400, errorMsg)))
  );

  render(<Coins />);

  await screen.findByText(errorMsg);
});
