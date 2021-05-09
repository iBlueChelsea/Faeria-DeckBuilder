import React from "react";
import images from "../../../assets/images/cards/images";

const DeckListItem = (props) => {
  return (
    <div
      data={JSON.stringify(props.data)}
      style={{ width: "17vw", cursor: "pointer" }}
      id={props.data.id}
      onClick={props.click}
    >
      <h1 style={{ textAlign: "center" }}>{props.data.deck_name}</h1>
      <img
        style={{ width: "17vw" }}
        id={props.data.id}
        alt={props.data.id}
        data={JSON.stringify(props.data)}
        src={images[props.data.cover]}
      />
    </div>
  );
};

export default DeckListItem;
