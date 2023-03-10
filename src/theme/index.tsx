import React from 'react';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useCustomSelector } from '../hooks/redux';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider: React.FC<Props> = ({ children }) => {
  const { themeMode } = useCustomSelector((state) => state.settings);

  const isLight = themeMode === 'light';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#F9FAFB'
      },
      mode: isLight ? 'light' : 'dark'
    }
  });

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;
