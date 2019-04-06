import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home"
import Navbar from './components/Navbar';
import Tags from './components/Tags';
import Welcome from './components/Welcome';
import SocialMedia from './components/SocialMedia';
import PostForm from './components/PostForm';
import PostWithComments from './components/PostWithComments';
import Error from './components/Error';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <React.Fragment>
              <Navbar />
              <div className="d-flex">
                <div className="p-1">
                  <Welcome />
                  <Tags />
                  <SocialMedia />
                </div>
                <div className="p-1 flex-grow-1">
                  <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/submit" component={PostForm} />
                    <Route path="/comments/*" component={PostWithComments} />
                    <Route component={Error} />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
