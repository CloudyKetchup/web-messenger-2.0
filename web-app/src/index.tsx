import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ProfileContextHelpers as Profile } from './helpers/ProfileContextHelpers';
import { Status } from './model/Status';

class AppWrapper extends Component {

  render = () => {
    if (!Profile.profileContext) {
      // TODO: work with backend 
      Profile.createContext({
        profile : {
          id : "1",
          nick : "John Wick",
          status : Status.ONLINE
        },
        friends : [{
          id : "2",
          nick : "Hideo Kojima",
          status : Status.ONLINE
        }],
        rooms : []
      });
    }
    return Profile.profileContext && <App/>
  };
}

ReactDOM.render(<AppWrapper/>, document.getElementById('root'));

serviceWorker.unregister();
