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
      imgDefault:"http://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/body_placeholder_650px.png"
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
  render() {
    let { images, errors,img_edit_mode } = this.state;
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
                                    <td valign="top" class="bodyContent" contenteditable="true">
                                      <h1 contenteditable="true">Designing Your Template</h1>
                                      <h3 contenteditable="true">
                                        Creating a good-looking email is simple
                                      </h3>
                                      Customize your template by clicking on the
                                      style editor tabs up above. Set your
                                      fonts, colors, and styles. After setting
                                      your styling is all done you can click
                                      here in this area, delete the text, and
                                      start adding your own awesome content.
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
                                        src={this.state.imgDefault}
                                        id="bodyImage"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="bodyContent">
                                      <h2>Styling Your Content</h2>
                                      <h4>Make your email easy to read</h4>
                                      After you enter your content, highlight
                                      the text you want to style and select the
                                      options you set in the style editor in the
                                      "<em>styles</em>" drop down box. Want to{" "}
                                      <a
                                        href="http://www.mailchimp.com/kb/article/im-using-the-style-designer-and-i-cant-get-my-formatting-to-change"
                                        target="_blank"
                                      >
                                        get rid of styling on a bit of text
                                      </a>
                                      , but having trouble doing it? Just use
                                      the "<em>remove formatting</em>" button to
                                      strip the text of any formatting and reset
                                      your style.
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
                                      *|IFNOT:ARCHIVE_PAGE|*
                                      *|LIST:DESCRIPTION|*
                                      <br />
                                      <br />
                                      <strong>Our mailing address is:</strong>
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
                                        unsubscribe from this list
                                      </a>
                                      &nbsp;&nbsp;&nbsp;
                                      <a href="*|UPDATE_PROFILE|*">
                                        update subscription preferences
                                      </a>
                                      &nbsp;
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
