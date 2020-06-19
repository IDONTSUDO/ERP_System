import Head from "next/head";
import Icon from "../helper/Icon";
import SearchBar from "./search/SearchBar"
import { Badge } from "antd";
export default () => (
  <ex>
    <header>
      <div className="logo logo_main_b main_logo_c"> <div className="logo_container"> <Icon className="logo_main_b" name="logo" /> <div className="slogan_main">Мир крутится вместе с нами</div> </div></div>
      <div className="phone_and_search_bar_c"> <span className="span_mr"> <Icon name="phone"/> 8-981-442-09-81 </span> <SearchBar className="searchBar"/> </div>

      <div className="header_bar">
      </div>
    </header>
    <style jsx>{`
      header {
        display: flex;
        justify-content: center;
        background-color: #ff00001f;
        width: 80%;
        margin: auto;
        border-radius: 5px;
        height: 100%;
      }
      .logo {
        justify-content: inherit;
    margin-right: auto;
      }
      .header_bar {
        display: flex;
        margin: auto;
      }
      .header_bar > div {
        display: flex;
        flex-direction: column;
      }
      .svg-icon {
        height: 2vh;
      }

      div > div {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin-top: auto;
        margin-bottom: auto;
      }
      .logo_main_b{
        width:200px;
        height:100px;
      }
      .slogan_main{
        display:flex;

      }
      .logo_container{
        display: flex;
        flex-flow: column;
      }
      .main_logo_c{
        display: flex;
        justify-items: center;
      }
      .phone_and_search_bar_c{
        display: flex;
    align-items: center;
      }
      .searchBar{
        background-color: #FFFFFF;
        width:200px;
      }
      .span_mr{
        margin-right:30px;
        font-family: Open Sans;
        font-weight: 300;
        font-size: 18px;
        line-height: 25px;
        text-align: center;

      }
    `}</style>
  </ex>
);
