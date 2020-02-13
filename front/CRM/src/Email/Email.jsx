import React, { Component } from "react";
import {
  MailImger,
  UploadEmailImg,
  DeleteImg,
  SaveSnipet,
  GetSnipets,
  SnipetDelete,
  AllSpecList,
  ContrAgentList
} from "../Api/Http.js";
import Error from "../Error/Error.jsx";
import EmailEditor from "react-email-editor";
import Highlighter from "react-highlight-words";
import moment from "moment";
import Rusmap from "../helper/RUSSIAN_MAP";
import { isAuthenticated } from "../Api/Auth";

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
  Steps
} from "antd";

const { Step } = Steps;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

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
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

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
        design
      };
      SaveSnipet(payload);
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
  LoadSnipets = (q, w, e, r, t, y) => {
    console.log(q, w, e, r, t, y);
  };
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
  handelTag = dataIndex => {
    return <h1>{dataIndex}</h1>;
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
        dataIndex: "email",
        key: "age",
        width: "20%",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Специализация",
        dataIndex: "specialications",
        key: "specialications",
        filters: this.state.specList.map((spec, i) => ({
          text: spec.data,
          value: spec.data
        })),
        // [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }]
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
        dataIndex: "agentGeo",
        key: "agentGeo",
        // ...this.handelTag("agentGeo")
        render: agentGeo => (
          <span>
            {agentGeo.map(tag => {
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
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    const steps = [
      {
        title: "Выберете специализации.",

        content: (
          <Checkbox.Group
            options={specListToStr(this.state.specList)}
            onChange={this.changeCheckBoxSpec}
          />
        )
      },
      {
        title: "Географиеское расположение",
        content: (
          <>
            <Checkbox.Group
              options={this.state.mapList}
              onChange={this.changeCheckBoxGeo}
            />
          </>
        )
      }
    ];
    function specListToStr(specList) {
      let SpecArray = [];
      specList.map((spec, i) => SpecArray.push(spec.data));
      return SpecArray;
    }
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
              <Table
                rowSelection={rowSelection}
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
                        onClick={() => message.success("Выполнено!")}
                      >
                        Завершить
                      </Button>
                    )}
                    {/* TODOODOODODODODOODO */}

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

              
              </>
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
                    <h2>{snip._id}</h2>
                    <Button onClick={snip => this.LoadSnipets(snip._id, snip)}>
                      Загрузить снипет
                    </Button>
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
