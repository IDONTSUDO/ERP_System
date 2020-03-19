import React from "../node_modules/react";
import { BrowserRouter } from "../node_modules/react-router-dom";
import MainRouter from "./Router/MainRouter.js";
import NotificationChat from "./WsSocket/NotificationChat.jsx";
import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Css/NewWork.css";
import "./Css/Common.css";
import "./Css/mail.css";
const App = () => (
  <BrowserRouter>
    <NotificationChat />
    <MainRouter />
  </BrowserRouter>
);

/* -------------------------------- П.Р.О.Л.О.Г.  --------------------------------//
Братишка, ты наверное искатель приключений раз решил посмотреть, этот проект.
То что ты здесь увидишь это очень дерьмовый код.
И такой скажешь ,а зачем ты пишешь дерьмово? А я тебе отвечу, красивые проекты не взлетают.
Потому что они не успевают взлететь. Пока инженеры в белых халатах, прикручивают красивый 
двигатель к идеальному крылу. Бригада взлохмаченых придурков.Во главе, с безумным авантюристом
пролетают над ними на конструкции из микроавтобуса забора,и двух промышленных фенов. 
Запомни братишка, твоя работа не в том. Что бы пить кофе, и уклонятся от написания кода. Твоя
работа в том что бы делать программы которые работают.
//----------------------------------               --------------------------------*/

export default App;
