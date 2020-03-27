import Head from "next/head";
import Icon from "../helper/Icon";
import { Badge } from "antd";
import Logo from "../helper/img/logo.png"
export default () => (
  <ex>
    <header>
      <div className="logo"><img src={Logo}/></div>

      <div className="header_bar">
        <div>
          <div>
            <Icon className="icon" name="price" width={35} /> В корзине
          </div>
          <div>
            <Icon className="icon" name="find" width={35} />В корзине
          </div>
        </div>
        <div>
          <div>
            {/* <Icon className="icon"  name="price"  /> В корзине */}
            <Icon className="icon" name="find" width={35} />В корзине
          </div>
          <div>
            2685 ₽ <Badge count={25} />
          </div>
        </div>
        <div>
          <div>
            <Icon className="icon" name="price" width={35} /> В корзине
          </div>
          <div>
            <Icon className="icon" name="find" width={35} />В корзине
          </div>
        </div>
      </div>
    </header>
    <style jsx>{`
      header {
        display: flex;
        justify-content: center;
        background-color: red;
        width: 50%;
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
    `}</style>
  </ex>
);
