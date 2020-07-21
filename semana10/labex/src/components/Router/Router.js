import React from 'react';
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import ListTripsPage from '../ListTripsPage/ListTripsPage';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import ApplicationFormPage from '../ApplicationFormPage/ApplicationFormPage';
import CandidatesPage from '../CandidatesPage/CandidatesPage';
import CreateTripPage from '../CreateTripPage/CreateTripPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/trips/list">
          <ListTripsPage />
        </Route>
        <Route exact path="/trips/application-form/:id">
          <ApplicationFormPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/trips/create">
          <CreateTripPage />
        </Route>
        <Route exact path="/trips/details/:id">
          <CandidatesPage />
        </Route>
        <Route path="/">
          <div>
            <h4>Opa, algo deu errado!</h4>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

const rootElement = document.getElementById("root");
ReactDOM.render(<Router />, rootElement);


