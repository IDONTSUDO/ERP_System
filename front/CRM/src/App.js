import React from '../node_modules/react'
import { BrowserRouter } from '../node_modules/react-router-dom'
import MainRouter from './MainRouter.js'
import 'antd/dist/antd.css'
const App = ()=>(
  <BrowserRouter>
      <MainRouter />
  </BrowserRouter>
)
 

export default App;
