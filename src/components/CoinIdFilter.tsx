import { useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRequest } from "../hooks/useRequest";
import { fetchCoinIds, OnError } from "../util/gecko";

export interface CoinIdFilterProps {
  ids: string[];
  onIdsChange: (ids: string[]) => void;
  onError: OnError;
}

export const CoinIdFilter = ({
  ids,
  onIdsChange,
  onError,
}: CoinIdFilterProps) => {
  const [coinIds, loading] = useRequest(
    useCallback(() => fetchCoinIds(onError), [onError])
  );

  return (
    <Autocomplete
      multiple
      value={ids}
      options={(coinIds ?? []).map((c) => c.id)}
      onChange={(_, values) => onIdsChange(values)}
      loading={loading}
      renderInput={(params) => (
        <TextField {...params} label="Filter by id" variant="standard" />
      )}
    />
  );
};
