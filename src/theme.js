import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b6ffff',
      main: '#df7332',
      dark: '#1E7827',
      contrastText: '#000000',
    },
    secondary: {
      light: '#C71212',
      main: '#155de9',
      dark: '#0035b6',
      contrastText: '#C7C7C7',
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