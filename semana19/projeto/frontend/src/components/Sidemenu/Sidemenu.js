import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MusicNote from '@material-ui/icons/MusicNote';import PlayArrow from '@material-ui/icons/PlayArrow';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Sidemenu = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const history = useHistory();

    const goToHome = () => {
        history.push("/");
    }

    const goToLogin = () => {
        history.push("/login");
    }

    const goToProfile = () => {
        history.push("/profile");
    }

    const goToTickets = () => {
        history.push("/tickets");
    }

    const goToAddTicket = () => {
        history.push("/addTicket");
    }

    const goToAddPhotos = () => {
        history.push("/addPhotos");
    }

    const goToAddShow = () => {
        history.push("/addShow");
    }

    const goToAddBand = () => {
        history.push("/addBand");
    }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title} onClick={goToHome} >
            Festival Lama
          </Typography>
          <Button color="inherit" onClick={goToLogin}>Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={goToProfile}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary={'Perfil'} />
            </ListItem>
            <ListItem button onClick={goToTickets}>
              <ListItemIcon><ConfirmationNumberIcon /></ListItemIcon>
              <ListItemText primary={'Comprar ingresso'} />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={goToAddBand}>
              <ListItemIcon><MusicNote /></ListItemIcon>
              <ListItemText primary={'Cadastrar banda'} />
            </ListItem>
            <ListItem button onClick={goToAddShow}>
              <ListItemIcon><PlayArrow /></ListItemIcon>
              <ListItemText primary={'Cadastrar show'} />
            </ListItem>
            <ListItem button onClick={goToAddTicket}>
              <ListItemIcon><AddBoxIcon /></ListItemIcon>
              <ListItemText primary={'Cadastrar ingresso'} />
            </ListItem>
            <ListItem button onClick={goToAddPhotos}>
              <ListItemIcon><AddAPhotoIcon /></ListItemIcon>
              <ListItemText primary={'Cadastrar fotos'} />
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}