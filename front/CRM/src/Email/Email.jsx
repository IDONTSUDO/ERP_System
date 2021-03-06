import React, { Component } from "react";
import {
  MailImger,
  UploadEmailImg,
  DeleteImg,
  SaveSnipet,
  GetSnipets,
  SnipetDelete,
  AllSpecList,
  ContrAgentList,
  GetDisign,
  SearchContrAgent,
  SearchAgentEmail,
  SeacrhSpecAgnets,
  SearchGeoAgents,
  EmailingLists,
  SendEmailSending,
  SimpelEmailing
} from "../Api/Http.js";
import Error from "../Error/Error.jsx";
import EmailEditor from "react-email-editor";
import Highlighter from "react-highlight-words";
import moment from "moment";
import Rusmap from "../helper/RUSSIAN_MAP";
import { isAuthenticated } from "../Api/Auth";
import { debounce } from "debounce";
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
  Modal,
  Tag,
  Checkbox,
  Steps,
  notification,
  Select
} from "antd";
const { CheckableTag } = Tag;

const { Step } = Steps;

const content = (
  <div>
    <p>agentName - для вставки имени контрагента </p>
    <p>agentLinkToUnsubscribe - для вставки поля для отписки</p>
  </div>
);
const { Option } = Select;

export default class Email extends Component {
  constructor() {
    super();
    this.state = {
      // errors
      erors: false,

      // agents
      visibleAgents: false,
      agntLoaders: true,
      childrenDrawerAgents: false,
      current: 0,
      resultAgents: [],
      resultSimpelAgentGeo: [],
      resultSimpelAgentSpec: [],
      mapList: [],
      // imgers
      visibleImgs: false,
      imgList: [],
      imgLoader: false,
      // tabel
      searchText: "",
      searchedColumn: "",
      agentList: [],
      specList: [],
      searchAgentEmail: "",
      selectedRowKeys: [],
      searchAgentName: "",
      geoSearch: [],
      agentResultsList: [],
      filteredAgent: [],
      // snipets
      snipetVisibel: false,
      newSnipets: "",
      snipetName: "",
      snipetList: [],
      loadingSnipetSave: false,
      snipetsListLoading: false,
      snipetsListVisibel: false
    };
  }
  componentDidMount() {
    this.email = new FormData();
    let mapArray = [];
    Rusmap.map((geo, i) => mapArray.push(geo.value));

    mapArray.sort((a, b) => a.localeCompare(b));

    this.setState({ mapList: mapArray });
  }
  forceUpdate() {
    MailImger().then(data => {
      if (data.err) {
        this.setState({ erors: true });
      } else {
        this.setState({ imgList: data });
      }
    });
    GetSnipets().then(data => {
      if (data.err) {
        this.setState({ error: true });
      } else {
        this.setState({ snipetList: data });
      }
    });
  }
  handleClickImgDelete = id => {
    DeleteImg(id).then(data => {
      if (data.err) {
        this.setState({ errorsValid: true });
      } else {
        this.forceUpdate();
      }
    });
  };
  SimpelSetingsToEmail = () => {
    let { resultSimpelAgentGeo, resultSimpelAgentSpec } = this.state;
    this.editor.exportHtml(data => {
      const { html } = data;
      let settings = {
        resultSimpelAgentGeo,
        resultSimpelAgentSpec,
        html
      };
      SimpelEmailing(settings).then(data => {
        console.log(data);
      });
    });
  };
  handleClickImgCopy = id => {
    let copyInfo = `${process.env.REACT_APP_API_URL}/${id}`;
    navigator.clipboard.writeText(copyInfo);
  };
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
      console.log("exportHtml", typeof design);
    });
  };

  // SNIPET
  send = () => {
    let { agentResultsList } = this.state;
    let errr;
    if (agentResultsList.length === 0) {
      errr = "Ни одного агента не добавлено";
      return this.err(errr);
    } else {
      this.editor.exportHtml(data => {
        const { html } = data;
        let settings = {
          agentResultsList,
          html
        };
        SendEmailSending(settings).then(data => {
          console.log(data);
        });
      });
    }
    // SendEmailSending().then(() =>da)
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  DeleteSnipets = (e, w) => {
    // loadDesign
    let re = /"/gi;
    const id = w.target.value.replace(re, "");

    SnipetDelete(id).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.forceUpdate();
      }
    });
  };

  onCloseSnipetsDriver = () => {
    this.setState({ snipetsListVisibel: false });
  };
  showModalSnipets = () => {
    this.setState({
      snipetVisibel: true
    });
  };

  handleOkSnipetSave = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;

      let { snipetName } = this.state;

      let payload = {
        snipetName,
        design,
        html
      };

      SaveSnipet(payload);
      this.setState({ snipetVisibel: false });
    });
  };
  SnipetsListDriwer = () => {
    this.setState({ snipetsListLoading: true });
    GetSnipets().then(data => {
      if (data.err) {
        this.setState({ error: true });
      } else {
        this.setState({
          snipetList: data,
          snipetsListVisibel: true,
          snipetsListLoading: false
        });
      }
    });
  };
  handleCancelSnipetSave = () => {
    this.setState({ snipetName: "", snipetVisibel: false });
  };
  handelSaveSnipet = () => {
    // snipetVisibel
  };

  // Agents Driwer
  showDrawerAgents = () => {
    this.setState({
      visibleAgents: true
    });
    ContrAgentList().then(data => {
      if (data.err) {
        this.setState({ error: true });
      } else {
        this.setState({ agentList: data });
        AllSpecList().then(data => {
          if (data.err) {
            this.setState({ error: true });
          } else {
            this.setState({ specList: data, agntLoaders: false });
          }
        });
      }
    });
  };

  showChildrenDrawerAgents = () => {
    this.setState({
      childrenDrawerAgents: true
    });
  };

  onChildrenDrawerCloseAgents = () => {
    this.setState({
      childrenDrawerAgents: false
    });
  };

  changeCheckBoxGeo = geo => {
    this.setState({ resultSimpelAgentGeo: geo });
  };
  changeCheckBoxSpec = spec => {
    this.setState({ resultSimpelAgentSpec: spec });
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
  handleChangeNewEmailPhoto = name => event => {
    event.preventDefault();
    const value = name === "email" ? event.target.files[0] : event.target.value;

    UploadEmailImg(value).then(data => {
      this.forceUpdate();
    });
  };
  LoadSnipets = (q, w) => {
    let re = /"/gi;
    const description = w.target.value.replace(re, "");

    GetDisign(description).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.editor.loadDesign(data);
      }
    });
  };
  // TABEL
  // SearchContrAgent

  specListToStr = specList => {
    let SpecArray = [];
    specList.map((spec, i) => SpecArray.push(spec.data));
    return SpecArray;
  };

  searchEmail = () => {
    let { searchAgentEmail } = this.state;
    if (searchAgentEmail.length < 3) {
      return this.searchError();
    } else {
      SearchAgentEmail(searchAgentEmail).then(data => {
        if (data.err) {
          this.setState({ error: true });
        } else {
          this.setState({ agentList: data });
        }
      });
    }
  };
  handelSearchGeo = () => {
    let { geoSearch } = this.state;
    console.log(geoSearch);
  };
  handlerAnyInput = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  SearchName = () => {
    let { searchAgentName } = this.state;
    if (searchAgentName.length < 3) {
      return this.searchError();
    } else {
      SearchContrAgent(searchAgentName).then(data => {
        if (data.err) {
          this.setState({ error: true });
        } else {
          this.setState({ agentList: data });
        }
      });
    }
  };

  changeSeachCheckBoxSpec = spec => {
    SeacrhSpecAgnets(spec).then(data => {
      if (data.err) {
        this.setState({ error: true });
      } else {
        this.setState({ agentList: data });
      }
    });
  };
  handleSelectgeoSearch = data => {
    this.setState({ geoSearch: data });
  };
  handelSearchGeo = () => {
    let { geoSearch } = this.state;

    SearchGeoAgents(geoSearch).then(data => {
      if (data.err) {
        this.setState({ error: true });
      } else {
        this.setState({ agentList: data });
      }
    });

    // if(geoSearch.length === 0){
    //   this.geoSerchError()
    // }else{

    // }
  };
  renderFilterGeo = data => ({
    filterDropdown: ({}) => (
      <div style={{ padding: 8 }}>
        <Button
          style={{ padding: 5 }}
          type="primary"
          onClick={this.handelSearchGeo}
        >
          Поиск
        </Button>
        <div className="rusInputMap"></div>
        <Select
          style={{ width: "auto" }}
          className="col-xs-12"
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Выберите область"
          value={this.state.geoSearch}
          onChange={this.handleSelectgeoSearch}
          maxTagCount={1}
        >
          {Rusmap.map(map => (
            <Select.Option key={map.value} value={map.value}>
              {map.value}
            </Select.Option>
          ))}
        </Select>
      </div>
    )
  });
  renderFilterEmail = data => ({
    filterDropdown: ({}) => (
      <div style={{ padding: 8 }}>
        <Input
          value={this.state.searchAgentEmail}
          placeHolder="Поиск по Email"
          onChange={this.handlerAnyInput("searchAgentEmail")}
        />
        <Button onClick={this.searchEmail}>Поиск</Button>
        <Button>Очистить</Button>
      </div>
    )
  });
  handleCloseTagsAngt = data => {
    // console.log(data)

    // let filterResult = agentResultsList
    this.setState({ filteredAgent: data });
  };
  renderFilterSpec = data => ({
    filterDropdown: ({}) => (
      <div style={{ padding: 8 }}>
        <>
          <Checkbox.Group
            options={this.specListToStr(this.state.specList)}
            onChange={this.changeSeachCheckBoxSpec}
          />
        </>
      </div>
    )
  });
  renderFilterName = data => ({
    filterDropdown: ({}) => (
      <div style={{ padding: 8 }}>
        <Input
          value={this.state.searchAgentName}
          placeHolder="Поиск по имени"
          onChange={this.handlerAnyInput("searchAgentName")}
        />
        <Button onClick={this.SearchName}>Поиск</Button>
        <Button>Очистить</Button>
      </div>
    )
  });

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
  handelAddingTagsAnetList = agent => {
    let { agentResultsList } = this.state;
    let ArrayAgents = [];
    ArrayAgents = agentResultsList;
    ArrayAgents.push(agent);

    this.setState({ agentResultsList: ArrayAgents });
  };
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
  handelTag = dataIndex => {
    return <h1>{dataIndex}</h1>;
  };
  searchError = () => {
    notification.open({
      message: "Введите больше 3 знаков для поиска",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  };
  geoSerchError = () => {
    notification.open({
      message: "Вы не ввели данных для поиска",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  };
  err = err => {
    notification.open({
      message: `${err}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  };
  render() {
    let { errors } = this.state;

    const columns = [
      {
        title: "Добавить",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              onClick={agent => this.handelAddingTagsAnetList(text, agent)}
            >
              +
            </Button>
          </span>
        )
      },
      {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.renderFilterName("email")
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "age",
        width: "20%",
        // filterIcon:(<><Icon type="search" style={{ color:   "#1890ff"  }} /></>),
        ...this.renderFilterEmail("email")

        // ...this.getColumnSearchProps("email")
      },
      {
        title: "Специализация",
        dataIndex: "specialications",
        key: "specialications",
        ...this.renderFilterSpec("specialications"),
        render: specialications => (
          <span>
            {specialications.map(tag => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "Гео",
        dataIndex: "region",
        key: "region",
        // ...this.handelTag("agentGeo")
        ...this.renderFilterGeo("agnetGeo"),

        render: region => (
          <span>
            {region.map(tag => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      }
    ];

    const success = () => {
      message.success("Адрес изображения скопирован!");
    };
    let { selectedRowKeys } = this.state;

    const hasSelected = this.state.selectedRowKeys.length > 0;

    const steps = [
      {
        title: "Выберете специализации.",

        content: (
          <div className="rusInputMap">
            <Checkbox.Group
              options={this.specListToStr(this.state.specList)}
              onChange={this.changeCheckBoxSpec}
            />
          </div>
        )
      },
      {
        title: "Географиеское расположение",
        content: (
          <>
            <div className="rusInputMap">
              <Checkbox.Group
                options={this.state.mapList}
                onChange={this.changeCheckBoxGeo}
              />
            </div>
          </>
        )
      }
    ];

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
                    <Button
                      size="large"
                      type="primary"
                      shape=""
                      onClick={this.send}
                      // onClick={this.showModalSnipets}
                      icon="mail"
                    ></Button>
                  </div>
                </div>
              </div>

              <EmailEditor locale="ru" ref={editor => (this.editor = editor)} />

              <div className="row">
                {this.state.agentResultsList.map((agnt, i) => (
                  <>
                    {/* <Popover
                      title="Контр Агент"
                      trigger="click"
                      title={
                        <>
                          <div>Email:{agnt.email}</div>
                          <div>Полное имя:{agnt.full_name}</div>
                          <div>Короткое имя:{agnt.name}</div>
                          <div>Расчетный счет:{agnt.payment_account}</div>
                          <div>
                            Гео:
                            {agnt.region.map((geo, i) => {
                              let color = geo.length > 5 ? "geekblue" : "green";
                              if (geo === "loser") {
                                color = "volcano";
                              }
                              return (
                                <Tag color={color} key={geo}>
                                  {geo.toUpperCase()}
                                </Tag>
                              );
                            })}
                          </div>
                          <div>
                            Техника:
                            {agnt.tech.map((tech, i) => {
                              let color =
                                tech.length > 5 ? "geekblue" : "green";
                              if (tech === "loser") {
                                color = "volcano";
                              }
                              return (
                                <Tag color={color} key={tech}>
                                  {tech.toUpperCase()}
                                </Tag>
                              );
                            })}
                          </div>
                        </>
                      }
                    > */}
                    <Tag
                      closable
                      onClose={e => {
                        // e.preventDefault();
                        this.handleCloseTagsAngt(e);
                      }}
                    >
                      {agnt.name}
                    </Tag>
                    {/* </Popover> */}
                  </>
                ))}
              </div>
            </div>
          </>
        )}
        <Drawer
          width={900}
          title={
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
          }
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
                  <div className="container">
                    <div className="row">
                      <div className="mb-4">
                        <div className="gallery">
                          <div className="gallery-image">
                            <img
                              className=""
                              src={`${process.env.REACT_APP_API_URL}/${img.filename}`}
                              alt={img.filename}
                              style={{ height: "200px", width: "300px" }}
                            />
                          </div>

                          <div className="gallery-text">
                            {/* handleClickImgDelete handleClickImgCopy */}
                            <h3
                              className="img_h3_delete"
                              onClick={id =>
                                this.handleClickImgDelete(img._id, id)
                              }
                            >
                              Удалить
                            </h3>
                            <h3 style={{ color: "#ffffff" }}>/</h3>
                            <h3
                              className="img_h3_copy"
                              onClick={id =>
                                this.handleClickImgCopy(img.filename, id)
                              }
                            >
                              Копировать
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
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
              <span style={{ marginLeft: 8 }}>
                {hasSelected
                  ? `Selected ${this.state.selectedRowKeys.length} items`
                  : ""}
              </span>
              <Table
                // rowSelection={rowSelection}
                // rowSelection={}
                columns={columns}
                dataSource={this.state.agentList}
              />
              <Button icon="share-alt" onClick={this.showChildrenDrawerAgents}>
                Простая настройка
              </Button>
              <Drawer
                title="Простая настройка"
                width={600}
                closable={false}
                onClose={this.onChildrenDrawerCloseAgents}
                visible={this.state.childrenDrawerAgents}
              >
                <div>
                  <Steps current={this.state.current}>
                    {steps.map(item => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>
                  <div className="steps-content">
                    {steps[this.state.current].content}
                  </div>
                  <div className="steps-action">
                    {this.state.current < steps.length - 1 && (
                      <Button type="primary" onClick={() => this.next()}>
                        Следующий этап
                      </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                      <Button
                        type="primary"
                        onClick={() => this.SimpelSetingsToEmail()}
                      >
                        Завершить
                      </Button>
                    )}

                    {this.state.current > 0 && (
                      <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => this.prev()}
                      >
                        Назад
                      </Button>
                    )}
                  </div>
                </div>

                {/* 
            
            
            {this.state.specList.map((spec, i) => (
              <>
                      <Checkbox value={spec.data}>{spec.data}</Checkbox>

              
              </>a
            )) }
            */}
              </Drawer>
              {/* TODO */}
            </>
          )}
        </Drawer>

        {/* SNIPETS SAVE */}
        <Modal
          visible={this.state.snipetVisibel}
          title={<h1>Название снипета</h1>}
          onOk={this.handleOkSnipetSave}
          onCancel={this.handleCancelSnipetSave}
          footer={[
            <Button key="back" onClick={this.handleCancelSnipetSave}>
              Назад
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loadingSnipetSave}
              onClick={this.handleOkSnipetSave}
            >
              Сохранить
            </Button>
          ]}
        >
          <Input
            onChange={this.handleChange("snipetName")}
            value={this.state.snipetName}
          ></Input>
        </Modal>

        {/* SNIPET DRAWER  */}
        <Drawer
          width={900}
          title="Снипеты"
          placement="left"
          closable={true}
          onClose={this.onCloseSnipetsDriver}
          visible={this.state.snipetsListVisibel}
        >
          {this.state.snipetsListLoading ? (
            <>
              {" "}
              <Spin size="large" />
            </>
          ) : (
            <>
              {this.state.snipetList.map((snip, i) => (
                <>
                  <div key={i}>
                    <h1>{snip.name}</h1>
                    <Button
                      value={snip._id}
                      onClick={snip => this.LoadSnipets(snip.disign, snip)}
                    >
                      Загрузить снипет
                    </Button>

                    <Button
                      type="danger"
                      icon="delete"
                      value={snip._id}
                      onClick={snip => this.DeleteSnipets(snip.disign, snip)}
                    ></Button>
                    {/* <Icon type="eye" /> */}
                    <Popover
                      content={
                        <div dangerouslySetInnerHTML={{ __html: snip.html }} />
                      }
                      title="Превью"
                      trigger="click"
                    >
                      <Button type="primary" icon="eye"></Button>
                    </Popover>
                    <div>
                      {moment(snip.dateCreated)
                        .locale("ru")
                        .format("LL")}
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        </Drawer>
      </div>
    );
  }
}
