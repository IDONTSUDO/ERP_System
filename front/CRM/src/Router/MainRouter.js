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
import DeviececEdit from '../User/DeviececEdit.jsx'


import AgentProfile from '../Contr-agent/AgentProfile.jsx'
import NewAgent from '../Contr-agent/NewAngent.jsx'
import MyAgent from '../Contr-agent/MyAgent.jsx'
import AllAgent from '../Contr-agent/AllAgent.jsx'
import ManageAgentPrice from '../Contr-agent/ManagePriceToAgent.jsx'
import EditContrAgent from '../Contr-agent/EditContrAgent.jsx'
import AgentTask from '../Contr-agent/AgentTask'
import AgentTasks from '../Contr-agent/AgentTasks.jsx'
import ManageAtAgent from "../Statistic/ManageAtAgent"
import Task from "../Contr-agent/Task"

import CalendarJob from '../Work/CalendarJob.jsx'
import SpecJob from '../Work/SpecJob.jsx'
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
import AssignedTask from '../Work/AssignedTask.jsx'
import TodoAssignUserBy from '../Work/TodoAssignUserBy.jsx'

import Mail from '../Email/Email.jsx'
import CompanyStatistic from '../Statistic/CompanyStatistic.jsx'

import MessageList from '../Messages/MessageList.jsx'

import EditorJob  from "../Work/EditorJob.jsx"


import ControlAgents from "../ControlAgents/ControlAgents.jsx"



const MainRouter = () => (
    <div>
        <MenuMain />
        <Switch>
            <Route exact path="/" component={Signin} />
            <PrivateRoute exact path="/news" component={News} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/statistic/:userId" component={MyStatistic} />
            <PrivateRoute exact path="/company" component={Company} />
            <PrivateRoute exact path="/create/work" component={Work} />
            {/*<PrivateRoute exact path="/edit/color/:userId" component={PersonalizationUser} /> */}
            <PrivateRoute exact path="/security/:userId" component={Security} />
            <PrivateRoute exact path="/device" component={DeviececEdit} />



            <PrivateRoute exact path="/new/worker" component={NewWorker} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/work/:userId" component={MyWork} />
            <PrivateRoute exact path="/job/:todoId" component={Job} />
            <PrivateRoute exact path="/today/:userId" component={TodayWork} />


            <PrivateRoute exact path="/all/agent" component={AllAgent} />
            <PrivateRoute exact path="/my/agent/:userId" component={MyAgent} />
            <PrivateRoute exact path="/new/agent" component={NewAgent} />
            <PrivateRoute exact path="/agent/:agentId" component={AgentProfile} />
            <PrivateRoute exact path="/agent/priced/:agentId" component={ManageAgentPrice} />
            <PrivateRoute exact path="/agent/tasks/:agentId" component={AgentTasks}/>
            <PrivateRoute exact path="/agent/task/:agentId/:month/:year" component={AgentTask}/>
            <PrivateRoute exact path="/agent/task/:taskId" component={Task}/>
            <PrivateRoute exact path="/manage/at/agent" component={ManageAtAgent}/>


            <PrivateRoute exact path="/edit/job/:jobid" component={EditorJob} />
            <PrivateRoute exact path="/todo/assign/user/:userBy" component={TodoAssignUserBy} />
            <PrivateRoute exact path="/new/deal/:userId" component={NewDeal} />
            <PrivateRoute exact path="/my/assign/task/:userId" component={AssignedTask} />
            <PrivateRoute exact path="/my/deal/:userId" component={DealHistory} />
            <PrivateRoute exact path="/company/statistic" component={CompanyStatistic} />
            <PrivateRoute exact path="/my/deal/history/:userId" component={MyDealHistory} />
            <PrivateRoute exact path="/agent/history/:agentId" component={AgentHistory} />
            <PrivateRoute exact path="/agent/edit/:agentId" component={EditContrAgent} />
            <PrivateRoute exact path="/message" component={MessageList} />
            <PrivateRoute exact path="/mailing" component={Mail} />
            <PrivateRoute exact path="/spec/job/:specId" component={SpecJob}/>
            <PrivateRoute exact path="/job/at/year/:userId" component={CalendarJob}/>
            <PrivateRoute exact path="/control/agent" component={ControlAgents}/>
        </Switch>
    </div>
)

export default MainRouter
