import { Chip, SvgIcon, SxProps, TableCell, Theme } from "@mui/material";

type TableIconBadgeCellProps = {
  icon: React.ReactNode;
  title: string;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
};

export function TableIconBadgeCell({
  icon,
  title,
  sx,
  iconSx,
}: TableIconBadgeCellProps) {
  return (
    <TableCell>
      <Chip
        label={title}
        icon={
          <SvgIcon color="inherit" sx={iconSx}>
            {icon}
          </SvgIcon>
        }
        size="small"  
        sx={sx}
      />
    </TableCell>
  );
}
