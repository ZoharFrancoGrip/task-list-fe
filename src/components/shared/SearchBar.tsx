import { useState } from 'react';
import { Box, TextField } from '@mui/material';

type SearchBarProps = {
  placeholder?: string;
  setSearchQuery: (value: string) => void;
}

export function SearchBar({ placeholder, setSearchQuery }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <TextField
          placeholder={placeholder}
            value={searchValue}
            onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchValue(e.target.value)
            }}
            size="small"
            
          />
        </Box>
    </Box>
  );
};

export default SearchBar;
