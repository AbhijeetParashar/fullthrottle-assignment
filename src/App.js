import React, { Component } from 'react';
import logo from "./image/fullthrottle.jpg"
import './App.css';
import UserList from './components/UserList'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Fullthrottle User Record App</h1>
          </header>
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/customerlist" />
            )} />
            <Route exact path='/customerlist' component={UserList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
