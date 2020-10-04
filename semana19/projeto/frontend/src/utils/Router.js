import React from 'react';
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/HomePage/HomePage';

import { useStyles } from '../styles/basicStyles';
import Typography from '@material-ui/core/Typography';
import { Sidemenu } from '../components/Sidemenu/Sidemenu';
import Signup from '../pages/SignupPage/SignupPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AddTicketsPage from '../pages/AddTicketsPage/AddTicketsPage';
import AddPhotosPage from '../pages/AddPhotosPage/AddPhotosPage';
import TicketsPage from '../pages/TicketsPage/TicketsPage';
import AddShowPage from '../pages/AddShowPage/AddShowPage';
import AddBandPage from '../pages/AddBandPage/AddBandPage';

const Router = () => {
  const classes = useStyles();
  
  return (
      <BrowserRouter>
        <Sidemenu />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/tickets">
            <TicketsPage />
          </Route>
          <Route exact path="/addBand">
            <AddBandPage />
          </Route>
          <Route exact path="/addShow">
            <AddShowPage />
          </Route>
          <Route exact path="/addTicket">
            <AddTicketsPage />
          </Route>
          <Route exact path="/addPhotos">
            <AddPhotosPage />
          </Route>
          <Route path="/">
              <Typography variant="h5" component="h2" className={classes.center}>
                Opa, algo errado não está certo
              </Typography>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default Router;

const rootElement = document.getElementById("root");
ReactDOM.render(<Router />, rootElement);
