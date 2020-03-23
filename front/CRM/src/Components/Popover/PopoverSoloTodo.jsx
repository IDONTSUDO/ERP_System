import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Popover, Button } from "antd";
import PropTypes from "prop-types";
import AvatarCus from "../Imager/Avatar";

export default function PopoverSoloTodo(props) {
  let { todo, icon } = props;

  return (
    <Popover
      Popover
      content={
        <>
          <Link
            to={
              todo.status === "system"
                ? `/spec/job/${todo._id}`
                : `/job/${todo._id}`
            }
            className="news"
          >
            <div>{todo.title}</div>
            <div dangerouslySetInnerHTML={{ __html: todo.description }} />
            <hr />
            <span></span>
            <Link to={`/user/${todo.posted_by}`}>
              <AvatarCus
                avatarLink={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
              />
            </Link>
          </Link>

          <div>
            <Button onClick={todoOne => this.clickComplateTodo(todo, todoOne)}>
              Выполненно
            </Button>
          </div>
        </>
      }
      title="Задача"
    >
      {icon ? (
        <UserOutlined
          style={{
            fontSize: "30px",
            color: "rgb(3, 169, 244)",
            marfin: "5px"
          }}
        />
      ) : null}
    </Popover>
  );
}
PopoverSoloTodo.propTypes = {
  todo: PropTypes.object,
  icon: PropTypes.bool
};
PopoverSoloTodo.defaultProps = {
  todo: { error: "Что то пошло не так" },
  icon: false
};
