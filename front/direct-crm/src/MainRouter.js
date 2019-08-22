import React from 'react'
import  {Route, Switch} from 'react-router-dom'
import Menu from './Core/Menu/Menu'
import Signin from './Auth/SignIn'
import PrivateRoute from './Auth/PrivateRouter'
import Profile from './User/Profile'
import Company from './User/Company'
//MainRouter главный роутер
const MainRouter = ()  =>(
    <div>
        <Menu />
    <Switch>
        <Route exact path="/signin" component={Signin}/>
        <PrivateRoute exact path="/profile" component={Profile}/>
        <PrivateRoute exact path="/company" component={Company}/>
    </Switch>
    </div>
)

export default MainRouter
