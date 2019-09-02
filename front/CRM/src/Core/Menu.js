import React  from 'react'
import {isAuthenticated, signout} from '../Api/Auth'
import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) =>{ 
if(history.location.pathname === path) return {color: "#ff9988"}
else return {color: "#ffffff"}
}

const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-primary"> 
    {!isAuthenticated() && ( 
    <> 
        <li className="nav-item"> 
            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Авторизация</Link> 
        </li>
    </> 
    )} 
    {isAuthenticated() && ( 
    <> 
        <li className="nav-item">
            <a className="nav-link" style={(isActive(history, "/"), 
                { cursor: "pointer", color: "#fff"})} onClick={() => history.push('/')}>Новости</a> 
        </li> 
        <li className="nav-item"> 
            <a className="nav-link" style={(isActive(history, "/signin"), 
                { cursor: "pointer", color: "#fff"})} onClick={() => signout(() => history.push('/signin'))}>Sign Out</a> 
        </li> 
        <li className="nav-item"> 
        <Link 
            to={`/user/${isAuthenticated().direct._id}`} 
            style={isActive( 
            history, 
            `/user/${isAuthenticated().direct._id}` 
            )} 
            className="nav-link" 
        > Мой профиль 
        </Link> 
        </li> 
            <li className="nav-item"> 
                <Link 
                to={`/create/work`} 
                style={isActive( 
                history, 
                `/create/work` 
                )} 
                className="nav-link" 
                > 
        Новое дело 
        </Link> 
        </li> 
        <li className="nav-item"> 
            <Link 
            to={`/company`} 
            style={isActive( 
            history, 
            `/company` 
            )} 
            className="nav-link" 
            > 
            Предприятие 
            </Link>
        </li> 
        <li className="nav-item"> 
            <Link 
            to={`/new/worker`} 
            style={isActive( 
            history, 
            `/new/worker` 
            )} 
            className="nav-link" 
            > 
            Новый работник 
            </Link>
        </li> 
        <li className="nav-item"> 
        <Link 
            to={`/user/work/${isAuthenticated().direct._id}`} 
            style={isActive( 
            history, 
            `/user/work/${isAuthenticated().direct._id}` 
            )} 
            className="nav-link" 
        > Мои дела
        </Link> 
        </li> 
    </> 
    )} 
</ul> 
</div> 
) 

export default withRouter(Menu)