import React from 'react';
import ReactDOM from 'react-dom';
import {subscribeUser} from './Push/subscription.js' 
import App from './App';
import "moment/locale/ru";

import * as serviceWorker from './Push/serviceWorker';

import { isAuthenticated,Subscribe,IsSubscriber } from "./Api/Auth"
ReactDOM.render(<App />, document.getElementById('root'));

if(IsSubscriber()){
    console.log("Subcribe")
}else{
    if(isAuthenticated()){
        subscribeUser()
        serviceWorker.register();
        let subscribe = true
        Subscribe(subscribe)
    }
    
}


