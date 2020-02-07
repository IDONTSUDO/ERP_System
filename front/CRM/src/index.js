
import React from 'react';
import ReactDOM from 'react-dom';
import { subscribeUser } from './Push/subscription.js'
import App from './App';
import "moment/locale/ru";
// import {TestSocket} from './WsSocket/ws-socket.js'
import * as serviceWorker from './Push/serviceWorker';
// import {P/rovider} from "react-redux"
// import { configureStore } from "./Redux/Store.js"
import { isAuthenticated, Subscribe, IsSubscriber } from "./Api/Auth"
require("setimmediate");


ReactDOM.render( <App/>, document.getElementById('root'));
// <Provider store={configureStore()}></Provider>
serviceWorker.register();
// подписка на сервис воркера
// TestSocket()
if (IsSubscriber()) {
    console.log("Subcribe")
} else {
    // isAuthenticated отвечает на главный вопрос, авторизован пользователь или нет?
    if (isAuthenticated()) {
        subscribeUser()

        let subscribe = true
        Subscribe(subscribe)
    }
}