import React, { Component } from "react";
import { GetEnterpriseManageAtAgentStatistic } from "../Api/Http";
import { List, Avatar, Button, Skeleton, Collapse } from "antd";
const { Panel } = Collapse;

export default class ManageAtAgent extends Component {
  constructor() {
    super();
    this.state = {
      manageAtAgent: [],
      loading: true
    };
  }
  componentDidMount() {
    GetEnterpriseManageAtAgentStatistic().then(data => {
      this.setState({ manageAtAgent: data, loading: false });
    });
  }
  render() {
    return (
      <div className="job-main-content">
        <List
          className="demo-loadmore-list"
          loading={this.state.loading}
          itemLayout="horizontal"
          style={{ margin: "5px" }}
          dataSource={this.state.manageAtAgent}
          renderItem={item => (
            <List.Item
              actions={
                [
                  //   onChange={callback}
                ]
              }
            >
              <Skeleton
                avatar
                title={false}
                loading={this.state.loading}
                active
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${item._id}?`}
                    />
                  }
                  description={
                    <>
                      <h1>{item.result}</h1>
                      <Collapse>
                        <Panel header="Агенты" key="1">
                          <p>2</p>
                        </Panel>
                        <Panel header="Активность по агентам" key="2">
                          <p>2</p>
                        </Panel>
                      </Collapse>
                    </>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
