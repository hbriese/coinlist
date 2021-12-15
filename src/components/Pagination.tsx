import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const pageSizes = [8, 25, 50];

export const INITIAL_PAGE_SIZE = pageSizes[0];

export interface PaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  hasMore?: boolean;
}

export const Pagination = ({
  page,
  onPageChange,
  pageSize,
  onPageSizeChange,
  hasMore,
}: PaginationProps) => {
  const handleChangePageSize = (e: SelectChangeEvent<number>) => {
    const v = e.target.value;
    onPageSizeChange(typeof v === "number" ? v : parseInt(v));
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
    >
      <FormControl variant="standard">
        <Select
          label="Page Size"
          value={pageSize}
          defaultValue={INITIAL_PAGE_SIZE}
          onChange={handleChangePageSize}
        >
          {pageSizes.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" flexDirection="row">
        <IconButton disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft />
        </IconButton>

        <IconButton disabled={!hasMore} onClick={() => onPageChange(page + 1)}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};
