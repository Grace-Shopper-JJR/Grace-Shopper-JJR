import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b6ffff',
      main: '#81d4fa',
      dark: '#4ba3c7',
      contrastText: '#455a64',
    },
    secondary: {
      light: '#ff9888',
      main: '#ff665b',
      dark: '#c63231',
      contrastText: '#fafafa',
    },
    overrides: {
        MuiCssBaseline: {
          "@global": {
            body: {
              backgroundImage:
                "url(https://www.freepik.com/free-photo/young-beautiful-woman-bright-sportwear-isolated-gradient-pink-blue-background-neon-light_11689918.htm)"
            }
          }
        }
      }
  },
});

export default theme;