import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Badge, Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

interface EnumFilterProps<T> {
  enumObject: T;
  onChange: (value: Array<T[keyof T]> | null) => void;
}

const EnumFilter = <T extends object>({
  enumObject,
  onChange,
}: EnumFilterProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValues, setSelectedValues] = useState<Array<T[keyof T]> | null>([]);

  const isMenuOpen = Boolean(anchorEl);

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: T[keyof T]) => {
    let newValue: Array<T[keyof T]> | null = null;
    
    if (selectedValues && selectedValues.includes(value)) {
      newValue = selectedValues.filter(v => v !== value);
    } else {
      newValue = selectedValues ? [...selectedValues, value] : [value];
    }

    setSelectedValues(newValue);
    onChange(newValue);
  };

  const handleReset = () => {
    setSelectedValues([]);
    onChange([]);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Badge
        color="primary"
        variant={selectedValues?.length && selectedValues.length > 0 ? 'dot' : undefined}
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <IconButton
          onClick={handleIconClick}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {Object.values(enumObject).map((value) => (
          <MenuItem
            key={value as string}
            onClick={() => handleSelect(value)}
              selected={Array.isArray(selectedValues) && selectedValues.includes(value)}
          >
            <Checkbox 
              checked={Array.isArray(selectedValues) && selectedValues.includes(value)}
              size="small"
            />
            {value}
          </MenuItem>
        ))}
        {selectedValues && (
          <MenuItem onClick={handleReset} sx={{ color: 'error.main' }}>
            Clear Filter
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default EnumFilter;
