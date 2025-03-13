import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    vars?: MuiTheme; // vars가 전체 Theme 구조를 포함하도록
  }
  interface ThemeOptions {
    vars?: Partial<MuiTheme>;
  }
}