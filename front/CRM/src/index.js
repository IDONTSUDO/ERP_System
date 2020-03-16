
import React from 'react';
import ReactDOM from 'react-dom';
import { subscribeUser } from './Push/subscription.js'
import App from './App';
import "moment/locale/ru";
import {weekStatic,weekEvery} from "./LocalStorage/Helper"
import * as serviceWorker from './Push/serviceWorker';

import { isAuthenticated, Subscribe, IsSubscriber } from "./Api/Auth"
require("setimmediate");


ReactDOM.render( <App/>, document.getElementById('root'));
serviceWorker.register();

if (IsSubscriber()) {
    console.log("Subcribe")
} else {
 
    if (isAuthenticated()) {
        subscribeUser()
        let subscribe = true
        Subscribe(subscribe)
    }
}
// weekEvery()
