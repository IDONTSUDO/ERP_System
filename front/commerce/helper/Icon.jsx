import React from "react";

import Priced from "./icon/Priced.js";
import Find from "./icon/Find.js";
import Catalog from "./icon/Catalog.js";
import Basket from "./icon/Basket.js";
import Order from "./icon/Order.js";
import Card from "./icon/Card.js";
import Mail from "./icon/Mail.js";
import Phone from "./icon/Phone.js";
import Paper from "./icon/Paper.js";
import Vk from "./icon/Vk.js";
import Logo from "./icon/svarog_logo.js"
/* 
@Desctiption: Icon component
@props: {width} ширина
@props: {fill} цвет
@props: {name} имя иконки
*/

const Icon = props => {
  switch (props.name) {
    case "price":
      return <Priced {...props} />;
    case "find":
      return <Find {...props} />;
    case "catalog":
      return <Catalog {...props} />;
    case "basket":
      return <Basket {...props} />;
    case "order":
      return <Order {...props} />;
    case "mail":
      return <Mail {...props} />;
    case "card":
      return <Card {...props} />;
    case "phone":
      return <Phone {...props} />;
    case "paper":
      return <Paper {...props} />;
    case "vk":
      return <Vk {...props}/>
    case "logo":
      return <Logo {...props}/>
  }
};

export default Icon;
