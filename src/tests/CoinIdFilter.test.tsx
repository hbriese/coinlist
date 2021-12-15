import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { FETCH_COIN_IDS_URL } from "../util/gecko";
import { COIN_IDS } from "./data";
import { CoinIdFilter } from "../components/CoinIdFilter";

const server = setupServer(
  rest.get(FETCH_COIN_IDS_URL, (req, res, ctx) => res(ctx.json(COIN_IDS)))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("coins ids are available as options", async () => {
  render(<CoinIdFilter ids={[]} onIdsChange={() => {}} onError={() => {}} />);

  const open = await screen.findByTitle("Open");
  open.click();

  for (const c of COIN_IDS) {
    const option = await screen.findByText(c.id);
    expect(option).toBeInTheDocument();
  }
});
