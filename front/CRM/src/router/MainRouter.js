import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRouter'

import MenuMain from '../Core/Menu.jsx'
import Signin from '../Auth/SignIn.jsx'
import Profile from '../User/Profile.jsx'
import Company from '../User/Company.jsx'
import News from '../User/News.jsx'
import MyStatistic from '../User/MyStatistic.jsx'
import PersonalizationUser from '../User/PersonalizationUser.jsx'
import Security from '../User/Security.jsx'

import AgentProfile from '../contr-agent/AgentProfile.jsx'
import NewAgent from '../contr-agent/NewAngent.jsx'
import MyAgent from '../contr-agent/MyAgent.jsx'
import AllAgent from '../contr-agent/AllAgent.jsx'
import SearchAgent from '../contr-agent/SearchAgent.jsx'

import Work from '../Work/NewWork.jsx'
import NewWorker from '../User/NewWorker.jsx'
import EditProfile from '../User/EditProfile.jsx'
import MyWork from '../Work/MyWork.jsx'
import Job from '../Work/Job.jsx'
import TodayWork from '../Work/TodayWork.jsx'
import AgentHistory from '../Deal/AgentHystory.jsx'
import NewDeal from '../Deal/NewDeal.jsx'
import DealHistory from '../Deal/DealHistory.jsx'
import MyDealHistory from '../Deal/MyDealHistory.jsx'


import CompanyStatistic from '../statistic/CompanyStatistic.jsx'
const MainRouter = () => (
    <div>
        <MenuMain />
        <Switch>
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/news" component={News} />
            <PrivateRoute exact path="/news" component={News} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/statistic/:userId" component={MyStatistic} />
            <PrivateRoute exact path="/company" component={Company} />
            <PrivateRoute exact path="/create/work" component={Work} />
            {/*<PrivateRoute exact path="/edit/color/:userId" component={PersonalizationUser} /> */}
            <PrivateRoute exact path="/security/:userId" component={Security} />
            
            <PrivateRoute exact path="/new/worker" component={NewWorker} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/work/:userId" component={MyWork} />
            <PrivateRoute exact path="/job/:todoId" component={Job} />
            <PrivateRoute exact path="/today/:userId" component={TodayWork} />

            <PrivateRoute exact path="/search/agent" component={SearchAgent} />
            <PrivateRoute exact path="/all/agent" component={AllAgent} />
            <PrivateRoute exact path="/my/agent/:userId" component={MyAgent} />
            <PrivateRoute exact path="/new/agent" component={NewAgent} />
            <PrivateRoute exact path="/agent/:agentId" component={AgentProfile} />


            <PrivateRoute exact path="/new/deal/:userId" component={NewDeal} />
            <PrivateRoute exact path="/my/deal/:userId" component={DealHistory} />
            <PrivateRoute exact path="/company/statistic" component={CompanyStatistic} />
            <PrivateRoute exact path="/my/deal/history/:userId" component={MyDealHistory} />
            <PrivateRoute exact path="/agent/history/:agentId" component={AgentHistory} />

        </Switch>
    </div>
)

export default MainRouter
