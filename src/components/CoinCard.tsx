import { Box, Collapse, Divider, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Coin } from "../util/gecko";
import { Price } from "./Price";
import { Row } from "./Row";

const LOGO_SIZE = 40;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0.5rem",
    padding: "1rem 1rem",
  },
});

export interface CoinCardProps {
  coin: Coin;
}

export const CoinCard = ({ coin: c }: CoinCardProps) => {
  const styles = useStyles();

  const [expanded, setExpanded] = useState(false);

  return (
    <Paper
      className={styles.root}
      elevation={1}
      onClick={() => setExpanded((expanded) => !expanded)}
    >
      <Box display="flex" flexDirection="row">
        <Box mr={2}>
          <img
            src={c.image}
            alt={`${c.name} logo`}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
        </Box>

        <Box flex={1}>
          <Typography>{c.symbol.toUpperCase()}</Typography>
          <Typography variant="caption">{c.name}</Typography>
        </Box>

        <Price
          price={c.current_price}
          percentChange={c.price_change_percentage_24h}
        />
      </Box>

      <Collapse in={expanded}>
        <Divider style={{ margin: "1rem 0rem" }} />

        <Row
          title="Market Cap"
          content={
            <Price
              price={c.market_cap}
              percentChange={c.market_cap_change_percentage_24h}
            />
          }
        />

        <Row
          title="All Time High"
          content={
            <Price price={c.ath} percentChange={c.ath_change_percentage} />
          }
        />
        <Row
          title="All Time Low"
          content={
            <Price price={c.atl} percentChange={c.atl_change_percentage} />
          }
        />

        {c.circulating_supply && (
          <Row
            title="Supply"
            content={
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography>{c.circulating_supply.toLocaleString()}</Typography>
                {c.max_supply && (
                  <Typography variant="caption">{`/ ${c.max_supply.toLocaleString()}`}</Typography>
                )}
              </Box>
            }
          />
        )}
      </Collapse>
    </Paper>
  );
};
