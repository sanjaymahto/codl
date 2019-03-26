import React, { Component } from 'react';
//import { Switch, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import Tags from './components/Tags';
import PostList from './components/Posts';
//import Default from './components/Default';
import Welcome from './components/Welcome';
import Links from './components/Links';
import { Provider } from 'react-redux';
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Navbar />
          <div className="d-flex">
            <div className="p-2">
              <Welcome />
              <Tags />
              <Links />
            </div>
            <div className="p-2 flex-grow-1">
              <PostList />
            </div>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;