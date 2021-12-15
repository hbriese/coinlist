import { Box, Typography } from "@mui/material";
import { Coins } from "./components/Coins";

export const App = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={5}>
      <Typography variant="h4">Markets</Typography>
      <Coins />
    </Box>
  );
};

export default App;
