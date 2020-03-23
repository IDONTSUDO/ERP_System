import React from "react";
import Default from "../../Assets/default.png";
export default function AvatarCus(props) {
  return (
    <div>
      <img
        onError={i => (i.target.src = `${Default}`)}
        className="avatar-img"
        src={props.avatarLink}
        alt=""
      />
    </div>
  );
}
AvatarCus.defaultProps = {
  avatarLink: "none"
};
