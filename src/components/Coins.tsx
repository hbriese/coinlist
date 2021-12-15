import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import { CoinCard } from "./CoinCard";
import { Coin, fetchCoins } from "../util/gecko";
import { INITIAL_PAGE_SIZE, Pagination } from "./Pagination";
import { CoinIdFilter } from "./CoinIdFilter";

export interface CoinsProps {}

export const Coins = (props: CoinsProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);

  const [error, setError] = useState<string>();
  const [filterIds, setFilterIds] = useState<string[]>([]);

  const [coins, setCoins] = useState<Coin[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setCoins(await fetchCoins(page, pageSize, filterIds, setError));
      setLoading(false);
    })();
  }, [page, pageSize, filterIds, setError]);

  if (loading) return <CircularProgress style={{ marginTop: "2rem" }} />;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width={400}>
      {error && <Alert severity="error">{error}</Alert>}

      <Box alignSelf="flex-end" minWidth={200} maxWidth={400} my={1}>
        <CoinIdFilter
          ids={filterIds}
          onIdsChange={setFilterIds}
          onError={setError}
        />
      </Box>

      {(coins ?? []).map((c) => (
        <CoinCard key={c.id} coin={c} />
      ))}

      <Pagination
        page={page}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        hasMore={coins?.length === pageSize}
      />
    </Box>
  );
};
