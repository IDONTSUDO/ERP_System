import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon, Affix } from 'antd';
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "../Api/Auth";
export default class MobileMenu extends Component {
  render() {
    return (
   <div>
       
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">

    </div>
    <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="#">Svarog CRM</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
            <Link to="/news">
                              <a class="nav-link" >Новости</a>
                            </Link>
            </li>
            <li class="nav-item">
                            <Link to="/create/work">
                              <a class="nav-link" >Новое дело</a>
                            </Link>
            </li>
            <li class="nav-item">
            <Link to="/news">
                              <a class="nav-link" >Новости</a>
                            </Link>
            </li>
            <li class="nav-item">
            <Link to="/news">
                              <a class="nav-link" >Новости</a>
                            </Link>
            </li>
            <li class="nav-item">
            <Link to="/news">
                              <a class="nav-link" >Новости</a>
                            </Link>
            </li>
        </ul>
    </div>
</nav>
</div>
    );
  }
}
