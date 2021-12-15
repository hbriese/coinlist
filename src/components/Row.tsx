import { Box, Typography } from "@mui/material";

export interface RowProps {
  title: string;
  content: string | React.ReactNode;
}

export const Row = ({ title, content }: RowProps) => (
  <Box display="flex" flexDirection="row" justifyContent="space-between" mt={1}>
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography>{title}</Typography>
    </Box>

    <Box>
      {typeof content === "string" ? (
        <Typography>{content}</Typography>
      ) : (
        content
      )}
    </Box>
  </Box>
);
