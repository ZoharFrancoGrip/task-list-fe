import { EnumFilter } from "./EnumFilter";

import { SxProps, TableCell, Theme } from "@mui/material";
import { Box, Typography } from "@mui/material";


type TableHeadCellFilterProps<T extends object> = {
  enumObject: T;
  onChange: (value: Array<T[keyof T]> | null) => void;
  title: string;
  sx: SxProps<Theme>;
};

export function TableHeadCellWithFilter<T extends object>({
  enumObject,
  onChange,
  title,
  sx,
}: TableHeadCellFilterProps<T>) {
  return (
    <TableCell>
      <Box sx={sx}>
        <Typography fontWeight="bold">{title}</Typography>
        <EnumFilter
          enumObject={enumObject}
          onChange={onChange}
        />
      </Box>
    </TableCell>
  );
}
