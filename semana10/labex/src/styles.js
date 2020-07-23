import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3BD97F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F27C38',
      contrastText: '#ffffff',
    },
  },
});
  
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: '24px!important',
    marginTop: 24
  },
  header: {
    width: '100%!important',
    display: 'flex!important',
    alignItems: 'center',
    justifyContent: 'space-between!important',
  },
  home: {
    display: 'flex!important',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px!important',
  },
  image: {
    maxHeight: 360,
    display: 'block',
    margin: 'auto!important',
    padding: '24px!important',
  },
  flex: {
    display: 'flex!important',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px!important',
  },
  centralize: {
    display: 'flex!important',
    alignItems: 'center',
    justifyContent: 'space-between!important',
    padding: '24px!important',
  },
  center: {
    textAlign: 'center',
  },
  logo: {
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 24px!important',
  },
  input: {
    minWidth: '400px!important',
    margin: '8px!important',
  },
  button: {
    minWidth: '160px!important',
    margin: '8px auto!important',
    backgroundColor: "#3BD97F",
    color: "#ffffff",
  },
  cards: {
    display: "flex!important",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: 'wrap',
    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 0,
    paddingLeft: 0,
  },
  card: {
    maxWidth: 240,
    margin: 16,
    padding: 8
  },
  cardLarge: {
    width: "100%",
    margin: 16,
    padding: 8
  },
  pos: {
    marginBottom: '24px!important',
  },
  whiteLink: {
    color: '#fff',
  },
  link: {
    textAlign: 'center',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));
  