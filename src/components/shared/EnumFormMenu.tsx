import { Select, MenuItem, Theme, SxProps, SelectChangeEvent } from "@mui/material";

type EnumFormMenuProps<T> = {
  value: string;
  setValue: (value: T) => void;
  options: string[];
  label: string;
  sx: SxProps<Theme>;
};

export function EnumFormMenu<T>({
  value,
  setValue,
  options,
  label,
  sx,
}: EnumFormMenuProps<T>) {
  return (
    <Select
      value={value || ""}
      onChange={(e: SelectChangeEvent<string>) => setValue(e.target.value as T)}
      fullWidth
      label={label}
      size="small"
      variant="outlined"
      sx={sx}
      displayEmpty
    >
      {options.map((option) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
    </Select>
  );
}
