import React from '../node_modules/react'
import { BrowserRouter } from '../node_modules/react-router-dom'
import MainRouter from './MainRouter.js'
import 'antd/dist/antd.css'
import "react-datepicker/dist/react-datepicker.css"
import "./Css/NewWork.css"
import "./Css/Common.css"
const App = ()=>(
  <BrowserRouter>
      <MainRouter />
  </BrowserRouter>
)
 

export default App;
