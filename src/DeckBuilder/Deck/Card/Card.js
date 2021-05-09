import React from "react";
import images from "../../../assets/images/cards/images";
import "./Card.css";

const Card = (props) => {
  const className = props.data.playable ? "selectable" : "not-selectable";
  const click = props.data.playable ? props.click : null;

  return (
    <div style={{ width: "15vw" }} id={props.data.id} onClick={click} className={className}>
      <img
        style={{ width: "15vw" }}
        id={props.data.id}
        alt={props.data.id}
        src={images[props.data.id]}
      />
    </div>
  );
};

export default Card;
