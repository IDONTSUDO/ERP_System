import React from 'react'
import  {Route, Switch} from 'react-router-dom'
import Menu from './Core/Menu'
import Signin from './Auth/SignIn'
import PrivateRoute from './Auth/PrivateRouter'
import Profile from './User/Profile'
import Company from './User/Company'

import Work from './Work/NewWork'
import NewWorker from './User/NewWorker' 
import EditProfile from './User/EditProfile'
import MyWork from './Work/MyWork'
import Job from './Work/Job'
const MainRouter = ()  =>(
    <div>
        <Menu />
    <Switch>
        <Route exact path="/signin" component={Signin}/>
        <PrivateRoute exact path="/user/:userId" component={Profile}/>
        <PrivateRoute exact path="/company" component={Company}/>
        <PrivateRoute exact path="/create/work" component={Work}/>
        <PrivateRoute exact path="/new/worker" component={NewWorker}/>
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
        <PrivateRoute exact path="/user/work/:userId" component={MyWork}/>
        <PrivateRoute exact path="/job/:todoId" component={Job}/>
    </Switch>
    </div>
)

export default MainRouter
