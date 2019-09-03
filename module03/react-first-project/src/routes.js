import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/**
 * react-router-dom eports a various kinds of routers and
 * BrowserRouter allows us to navigate from a page onto another page
 * and our routes will be formated with bars / (http://localhost:3000/contacts).
 * There are many another kinds of routes and is very important to study them.
 *
 * Switch will ensure that only one route will be called per moment, because ReactRouterDom
 * might call more than one route per moment.
 */

/**
 * We need to import every component that we want to navigate
 */
import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        {
          // without this exact, if user type http://localhost:3000/repository
          // will route to Main
          // because o /. Exact will catch exact route.
        }
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
