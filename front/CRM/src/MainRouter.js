import React from 'react'
import  {Route, Switch} from 'react-router-dom'
import SiderDemo from './Core/Menu'
import Signin from './Auth/SignIn'
import PrivateRoute from './Auth/PrivateRouter'
import Profile from './User/Profile'
import Company from './User/Company'
import News from './User/News'

import AgentProfile from './contr-agent/AgentProfile'
import NewAgent from './contr-agent/NewAngent.jsx'
import MyAgent from './contr-agent/MyAgent.jsx'
import AllAgent from './contr-agent/AllAgent'
import SearchAgent from './contr-agent/SearchAgent'


import Work from './Work/NewWork'
import NewWorker from './User/NewWorker' 
import EditProfile from './User/EditProfile'
import MyWork from './Work/MyWork'
import Job from './Work/Job'
import TodayWork from './Work/TodayWork.js'


import NewDeal from './Deal/NewDeal.jsx'
import DealHistory from './Deal/DealHistory'
const MainRouter = ()  =>(
    <div>
        <SiderDemo />
    <Switch>
        <Route exact path="/signin" component={Signin}/>
        <PrivateRoute exact path="/news" component={News}/>
        <PrivateRoute exact path="/user/:userId" component={Profile}/>
        <PrivateRoute exact path="/company" component={Company}/>
        <PrivateRoute exact path="/create/work" component={Work}/>
        <PrivateRoute exact path="/new/worker" component={NewWorker}/>
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
        <PrivateRoute exact path="/user/work/:userId" component={MyWork}/>
        <PrivateRoute exact path="/job/:todoId" component={Job}/>
        <PrivateRoute exact path="/today/:userId" component={TodayWork}/> 

        <PrivateRoute exact path="/search/agent" component={SearchAgent}/>
        <PrivateRoute exact path="/all/agent" component={AllAgent}/>
        <PrivateRoute exact path="/my/agent/:userId" component={MyAgent}/>
        <PrivateRoute exact path="/new/agent" component={NewAgent}/>
        <PrivateRoute exact path="/agent/:agentId" component={AgentProfile}/> 


        <PrivateRoute exact path="/new/deal/:userId" component={NewDeal}/> 
        <PrivateRoute exact path="/deal/history/:userId" component={DealHistory}/> 
    </Switch>
    </div>
)

export default MainRouter
