import React, { Component } from "react";
import { MailImger, UploadEmailImg, DeleteImg,SaveSnipet,GetSnipets,SnipetDelete } from "../Api/Http.js";
import Error from "../Error/Error.jsx";
import EmailEditor from "react-email-editor";
import Highlighter from "react-highlight-words";
import {isAuthenticated} from "../Api/Auth";

import {
  Table,
  Upload,
  Icon,
  message,
  Button,
  Input,
  Switch,
  Drawer,
  Popover,
  Spin,
  Modal
} from "antd";
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);


const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
];

export default class Email extends Component {
  constructor() {
    super();
    this.state = {
      // errors
      erors: false,

      // agents
      visibleAgents: false,
      agntLoaders: true,
      // imgers
      visibleImgs: false,
      imgList: [],
      imgLoader: false,
      // tabel
      searchText: "",
      searchedColumn: "",

      // snipets
      snipetVisibel:false,
      newSnipets:"",
      snipetName:"",
      snipetList:[],
      loadingSnipetSave:false,
      snipetsListLoading:false,
      snipetsListVisibel:false
    };
  }
  componentDidMount() {
   
    this.email = new FormData();
  }
  forceUpdate() {
    MailImger().then(data => {
      if (data.err) {
        this.setState({ erors: true });
      } else {
        this.setState({ imgList: data });
      }
    });
  }
  handleClickImgDelete = (id) =>{
   
    
    DeleteImg(id).then(data =>{
      if(data.err){
        this.setState({errorsValid: true})
      }else{
        this.forceUpdate()
      }
    })
  }
  
  handleClickImgCopy =  (id)  =>{
    let copyInfo = `${process.env.REACT_APP_API_URL}/${id}`
    navigator.clipboard.writeText(copyInfo)
    // textAreaRef.current.

  }
  switchChange = checked => {
    this.setState({ img_edit_mode: checked });
  };
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;
      console.log("exportHtml",typeof design);
    });
  };

  // SNIPET
  showModalSnipets = () => {
    this.setState({
      snipetVisibel: true,
    });
  };
  handleOkSnipetSave = () =>{

    this.editor.exportHtml(data => {
      const { design, html } = data;
  
      let { snipetName } = this.state

    let payload = {
      snipetName,
      design
    }
    SaveSnipet(payload)
    }); 
    
  }
  SnipetsListDriwer = () =>{
    GetSnipets().then(data =>{
      if(data.err){
        this.setState({error:true})
      }else{
        this.setState({snipetList:data,snipetsListVisibel:true})
      }
    })
  }
  handleCancelSnipetSave = () =>{
    this.setState({snipetName:"",snipetVisibel:false})
  }
  handelSaveSnipet = () =>{
// snipetVisibel
  }
  // Agents Driwer
  showDrawerAgents = () => {
    this.setState({
      visibleAgents: true
    });
  };
  onCloseAgentsDriver = () => {
    this.setState({
      visibleAgents: false,
      agntLoaders: true
    });
  };
  //  img Driver
  showDrawerImger = () => {
    this.setState({
      visibleImgs: true,
      imgLoader: true
    });
    MailImger().then(data => {
      if (data.err) {
        this.setState({ error: true });
      } else {
        this.setState({ imgLoader: false, imgList: data });
      }
    });
  };
  onCloseImgsDriver = () => {
    this.setState({
      visibleImgs: false
    });
  };
  handleChangeNewEmailPhoto = name =>event => {
    event.preventDefault();
    const value = name === "email" ? event.target.files[0] : event.target.value;
  
    // let userId = isAuthenticated().direct._id;

    UploadEmailImg(value).then(data =>{
      this.forceUpdate()
    })
      // console.log(email)
    // this.userData.set("Date_of_Birth",Date_of_Birth)

  }
  // TABEL
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    let { errors } = this.state;
    const columns = [
      {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Email",
        dataIndex: "age",
        key: "age",
        width: "20%",
        ...this.getColumnSearchProps("age")
      },
      {
        title: "Специализация",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address")
      },
      {
        title: "Специализация",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address")
      },
      {
        title: "Специализация",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address")
      }
    ];
    const success = () => {
      message.success('Адрес изображения скопирован!');
    };
    return (
      
      <div>
        {errors ? (
          <Error />
        ) : (
          <>
            <div className="email_main_pos">
              <div classname="container">
                <div className="row">
                  <div className="col">
                    <Button
                      type="primary"
                      size="large"
                      shape=""
                      onClick={this.showDrawerAgents}
                      icon="solution"
                    >
                      Агенты
                    </Button>

                    <Popover content={content} title="Title" trigger="click">
                      <Button
                        size="large"
                        type="primary"
                        shape=""
                        icon="question-circle"
                      >
                        Помощь
                      </Button>
                    </Popover>
                    {/* <Icon type="picture" /> */}
                    <Button
                      size="large"
                      type="primary"
                      shape=""
                      onClick={this.showDrawerImger}
                      icon="file-image"
                    >
                      Фото
                    </Button>
                    <Button
                      size="large"
                      type="primary"
                      shape=""
                      onClick={this.SnipetsListDriwer}
                      icon="picture"
                    >
                      Снипеты
                    </Button>
                    <Button
                      size="large"
                      type="primary"
                      shape=""
                      onClick={this.showModalSnipets}
                      icon="file-add"
                    >
                      Сохранить
                    </Button>
                  </div>
                </div>
              </div>
              {/* <div>
  <button onClick={this.exportHtml}>Export HTML</button>
</div> */}

              <EmailEditor ref={editor => (this.editor = editor)} />
            </div>
          </>
        )}
        <Drawer
          width={900}
          title={(
            <>
<div>Управление изображениями</div>
<div>
<div class="upload-btn-wrapper">
          <button class="btn-uploaded">Загрузить</button>
          <input
            onChange={this.handleChangeNewEmailPhoto("email")}
            type="file"
            accept="image/*"
          />
        </div>
        </div>
</>
         )}
          placement="right"
          closable={true}
          onClose={this.onCloseImgsDriver}
          visible={this.state.visibleImgs}
        >
          {this.state.imgLoader ? (
            <Spin size="large" />
          ) : (
            <>
              {this.state.imgList.map((img, i) => (
                <>
                <div className="container"><div className="row">
                  <div className="mb-4">
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
                          {/* handleClickImgDelete handleClickImgCopy */}
                            <h3 className="img_h3_delete"  onClick={id => this.handleClickImgDelete(img._id, id)}>Удалить</h3>
                            <h3 style={{ color: "#ffffff" }}>/</h3>
                            <h3  className="img_h3_copy" onClick={id => this.handleClickImgCopy(img.filename, id)} >Копировать</h3>
                          </div>
                          
                            
                         
                        </div>
                  </div>
                  </div> </div>
                </>
              ))}
            </>
          )}
        </Drawer>
        <Drawer
          width={900}
          title="Контр Агенты для раccылки"
          placement="left"
          closable={true}
          onClose={this.onCloseAgentsDriver}
          visible={this.state.visibleAgents}
        >
          {this.state.agntLoaders ? (
            <>
              {" "}
              <Spin size="large" />
            </>
          ) : (
            <>
              {" "}
              <Table columns={columns} dataSource={data} />
            </>
          )}
        </Drawer>

        {/* SNIPETS SAVE */}
        <Modal
          visible={this.state.snipetVisibel}
          title={(<h1>Название снипета</h1>)}
          onOk={this.handleOkSnipetSave}
          onCancel={this.handleCancelSnipetSave}
          footer={[
            <Button key="back" onClick={this.handleCancelSnipetSave}>
              Назад
            </Button>,
            <Button key="submit" type="primary" loading={this.state.loadingSnipetSave} onClick={this.handleOkSnipetSave}>
              Сохранить
            </Button>,
          ]}
        >
        
         <Input onChange={this.handleChange("snipetName")} value={this.state.snipetName}></Input>
        </Modal>
        <Drawer
          width={900}
          title="Снипеты"
          placement="left"
          closable={true}
          onClose={this.onCloseAgentsDriver}
          visible={this.state.snipetsListVisibel}
        >
          {this.state.snipetsListLoading ? (
            <>
              {" "}
              <Spin size="large" />
            </>
          ) : (
            <>
             
            </>
          )}
        </Drawer>
      </div>
    );
  }
}
// snipetsListVisibel