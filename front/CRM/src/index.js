import React from 'react';
import ReactDOM from 'react-dom';
import {subscribeUser} from './Push/subscription.js' 
import App from './App';
import * as serviceWorker from './Push/serviceWorker';

import { isAuthenticated} from "./Api/Auth"
ReactDOM.render(<App />, document.getElementById('root'));

if(isAuthenticated()){
    subscribeUser()
}
serviceWorker.register();

