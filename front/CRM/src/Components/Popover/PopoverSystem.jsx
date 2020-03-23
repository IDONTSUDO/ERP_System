import React from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Popover } from "antd";

import PropTypes from "prop-types";

export default function PopoverSystem(props) {
  let { todo, icon } = props;

  return (
    <div>
      <Popover
        Popover
        content={
          <>
            {todo.error === "Что то пошло не так" ? (
              <>{todo.error}</>
            ) : (
              <Link to={`/spec/job/${todo._id}`} className="news">
                <div>Имя:{todo.agentByTodo[0].name}</div>
                <div>Телефон:{todo.agentByTodo[0].phone}</div>
                <div>Полное имя:{todo.agentByTodo[0].full_name}</div>
                <div>Email:{todo.agentByTodo[0].email}</div>
                <div>{todo.error}</div>
              </Link>
            )}
          </>
        }
        title="Задача"
      >
        {icon ? (
          <WhatsAppOutlined
            style={{
              fontSize: "30px",
              color: "rgb(3, 169, 244)",
              marfin: "5px"
            }}
          />
        ) : null}
      </Popover>
    </div>
  );
}
PopoverSystem.defaultProps = {
  todo: { error: "Что то пошло не так" },
  icon: PropTypes.bool
};
PopoverSystem.propTypes = {
  todo: PropTypes.object,
  icon: false
};
