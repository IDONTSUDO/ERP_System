import React, { Component } from "react";
import { MailImger, UploadEmailImg, DeleteImg } from "../Api/Http.js";
import Error from "../Error/Error.jsx";
import { Upload, Icon, message, Button, Input,Switch } from "antd";


export default class Email extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      erors: false,
      value: "",
      visible: false,
      file: null,
      img_edit_mode:false,
      imgDefault:"http://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/body_placeholder_650px.png",
      textHeader1: "Разработка вашего шаблона",
      textHeader2:"Стилизация вашего контентa",
      textMessage1: "Настройте свой шаблон, нажав на вкладки редактора стилей вверху. Установите ваши шрифты, цвета и стили. После того, как настройка вашего стиля полностью завершена, вы можете нажать здесь, в этой области, удалить текст и начать добавлять свой собственный потрясающий контент.",
      textMessage2:"После ввода содержимого выделите текст, который хотите стилизовать, и выберите параметры, заданные в редакторе стилей, в раскрывающемся списке «стили». Хотите избавиться от стиля текста, но не можете это сделать? Просто используйте кнопку «удалить форматирование», чтобы удалить текст любого форматирования и сбросить ваш стиль.",
      textItalic1:"Сделайте вашу электронную почту легко читаемой",
      textItalic2:"Создать красивую электронную почту просто"
    };
  }
  componentDidMount() {
    MailImger().then(data => {
      if (data.err) {
        this.setState({ erors: true });
      } else {
        this.setState({ images: data });
      }
    });
  }
  forceUpdate() {
    MailImger().then(data => {
      if (data.err) {
        this.setState({ erors: true });
      } else {
        this.setState({ images: data });
      }
    });
  }
  handleClick = (id) => {
   let url = "http://localhost:8080/" +id
   this.setState({imgDefault:url})
  }
  switchChange = (checked) =>{
      this.setState({img_edit_mode:checked})
  }
  handleChange = name => event => {
    console.log(200)
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  render() {
    let { images, errors,img_edit_mode,  textHeader1,textMessage1,textMessage2,textHeader2,textItalic1,textItalic2,imgDefault } = this.state;
    return (
      <div>
        {errors ? (
          <Error />
        ) : (
          <>
            <div className="postisitonRelativeSmeni">
              <div className="container">
                <div className="row">
                  <div className="col-md-1">
                    <div style={{ padding: "5px" }}>
                      
                    <Switch  onChange={this.switchChange}   defaultChecked />
                    </div>
                  

                    {images.map((img, i) => (
                      <>
                        <div className="gallery">
                          <div
                         
                          className="gallery-image">
                            <img
                              className=""
                              
                              src={`${process.env.REACT_APP_API_URL}/${img.filename}`}
                              alt={img.filename}
                              style={{ height: "200px", width: "300px" }}
                            />
                            
                          </div>
                         
                          <div className="gallery-text">
                            <h3 style={{ color: "#48f542" }} onClick={id => this.handleClick(img.filename, id)}>Фото 1</h3>
                            <h3 style={{ color: "#f54542" }}  onClick={id => this.handleClick(img.filename, id)}>Фото 2</h3>
                          </div>
                          
                            
                         
                        </div>
                        {img_edit_mode ? ( <Button type="danger"></Button>):(<></>)}
                       
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div class="container">
                <body
                  leftmargin="0"
                  marginwidth="0"
                  topmargin="0"
                  marginheight="0"
                  offset="0"
                >
                  <center>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      height="100%"
                      width="100%"
                      id="bodyTable"
                    >
                      <tr>
                        <td align="center" valign="top" id="bodyCell">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            id="templateContainer"
                          >
                            <tr>
                              <td align="center" valign="top">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  id="templatePreheader"
                                >
                                  <tr>
                                    <td
                                      valign="top"
                                      class="preheaderContent"
                                    ></td>

                                   
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  id="templateHeader"
                                >
                                  <tr>
                                    <td valign="top" class="headerContent">
                                      <img
                                      onClick
                                        src="http://gallery.mailchimp.com/2425ea8ad3/images/header_placeholder_600px.png"
                                        id="headerImage"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  id="templateBody"
                                >
                                  <tr>
                                    <td  onChange={this.handleChange("textMessage1")} valign="top" class="bodyContent" contenteditable="true">
                                      <h1 contenteditable="true"  onChange={this.handleChange("textHeader1")}           value={textHeader1}>{textHeader1}</h1>
                                      <h3 contenteditable="true">
                                      {/* textMessage1,textHeader2,textItalic1,textItalic2  */}
                                   </h3>
                                     {textMessage1}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="bodyContent"
                                      style={{
                                        paddingTop: "0",
                                        paddingBottom: "0"
                                      }}
                                    >
                                      <img
                                        src={imgDefault}
                                        id="bodyImage"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="bodyContent" contenteditable="true">
                                      <h2 contenteditable="true"  onChange={this.handleChange("textHeader2")}>{textHeader2}</h2>
                                      <h4 contenteditable="true" onChange={this.handleChange("textMessage2")}>{textMessage2}</h4><em>styles</em>" drop down box. Want to{" "}
                                      {textMessage2}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  id="templateFooter"
                                >
                                  
                                  <tr>
                                    <td
                                      valign="top"
                                      class="footerContent"
                                      style={{ paddingTop: "0" }}
                                    >
                                      <br />
                                      <strong>svarog.robot@gmail.com</strong>
                                      <br />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      valign="top"
                                      class="footerContent"
                                      style={{ paddingTop: "0" }}
                                    >
                                      <a href="*|UNSUB|*">
                                       Отписаться от рассылок
                                      </a>
                                      
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </center>
                </body>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
{
  /* <h1>Email рассылки</h1>
<div style={{ padding: "5px" }}>
  <Button type="primary" onClick={this.showDrawer}>
    Контр агенты
  </Button>
</div>

<div class="row">
  <div class="col-sm">
    {images.map((img, i) => (
      <>
        <div className="gallery">
          <div className="gallery-image">
            <img
              
              src={`${process.env.REACT_APP_API_URL}/${img.filename}`}
              alt={img.filename}
              style={{ height: "200px", width: "300px" }}
            />

            <div className="gallery-text">
              <h3 onClick={console.log(201)}>Удалить?</h3>
              <h3 onClick={console.log(200)}>Удалить?</h3>
              <h3 onClick={console.log(203)}>Удалить?</h3>
            </div>


          </div>
        </div>
        <Radio.Group
          onChange={this.onChange}
          value={this.state.value}
        >
          <Radio value={img.filename}>Выбрать</Radio>
        </Radio.Group>
      </>
    ))}
    <form
      action="/profile"
      method="post"
      enctype="multipart/form-data"
    >
      <input
        onChange={this.fileUpload}
        type="file"
        name="avatar"
      />
    </form>
  </div>
  <div class="col-sm">
    {" "}
    <div>
      <Input
        placeholder="Введите заголовок письма"
        allowClear
        onChange={this.onChange}
      />
      <br />
      <br />
      <TextArea
        placeholder="Введите текст тела письма"
        allowClear
        onChange={this.onChange}
      />
    </div>
  </div>
  <Button type="primary" onClick={this.fileLoader}>
    Отправить
  </Button>

  <div class="col-sm">Одна из трёх колонок</div>
</div> */
}
