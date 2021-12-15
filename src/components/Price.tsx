import { Box, Typography } from "@mui/material";
import { CURRENCY_SYMBOL } from "../util/gecko";

export interface PriceProps {
  price?: number;
  percentChange?: number;
}

export const Price = ({ price, percentChange }: PriceProps) => {
  const changeColor = !percentChange
    ? undefined
    : percentChange > 0
    ? "green"
    : "red";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-end"
    >
      {price ? (
        <Typography>{`${CURRENCY_SYMBOL}${price.toLocaleString()}`}</Typography>
      ) : (
        <Typography>Price unavailable</Typography>
      )}

      {percentChange && (
        <Typography
          variant="caption"
          color={changeColor}
        >{`${percentChange.toLocaleString()}%`}</Typography>
      )}
    </Box>
  );
};
