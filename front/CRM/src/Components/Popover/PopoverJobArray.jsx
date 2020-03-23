import React from "react";
import AvatarCus from "../Imager/Avatar";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import PropTypes from "prop-types";
import { TeamOutlined } from "@ant-design/icons";

export default function PopoverJobArray(props) {
  const { todo, icon } = props;
  return (
    <>
      <Popover
        Popover
        content={
          <>
            {" "}
            <Link
              to={
                todo.status === "system"
                  ? `/spec/job/${todo._id}`
                  : `/job/${todo._id}`
              }
              className="news"
            >
              {todo.JobArray.map((job, i) => (
                <>
                  {job.user.length === 33 ? (
                    <Link to={`/user/${job.user.slice(0, -9)}`}>
                      <AvatarCus
                        avatarLink={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
                      />
                    </Link>
                  ) : (
                    <Link to={`/user/${job.user}`}>
                      <AvatarCus
                        avatarLink={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
                      />
                    </Link>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job.action
                    }}
                  ></div>
                  <div>{job.date}</div>
                  <hr />
                </>
              ))}
              <AvatarCus
                avatarLink={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
              />
            </Link>
          </>
        }
        title="Задача"
      >
        {icon ? (
          <TeamOutlined
            style={{
              fontSize: "30px",
              color: "rgb(3, 169, 244)",
              marfin: "5px"
            }}
          />
        ) : null}
      </Popover>
    </>
  );
}
PopoverJobArray.defaultProps = {
  todo: { error: "Что то пошло не так" },
  icon: false
};
PopoverJobArray.propTypes = {
  todo: PropTypes.object,
  icon: PropTypes.bool
};
