import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Home from './views/Home/Home';
import Partitura from './views/Partitura/Partitura';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import { queries, types } from '@partituras/schemas';

import * as serviceWorker from './serviceWorker';

import './index.scss';
import SheetMusic from './views/SheetMusic/SheetMusic';

const apolloClient = new ApolloClient({
  typeDefs: [
    ...Object.values(types),
    ...Object.values(queries),
  ],
  uri: '/api'
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route path="/" exact={true}>
            <Home/>
          </Route>
          <Route path="/partituras" exact={true}>
            <SheetMusic/>
          </Route>
          <Route path="/partitura/:id">
            <Partitura/>
          </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
