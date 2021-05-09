import React from "react";
import CardListItem from "./CardListItem/CardListItem";
import { ListGroup } from "react-bootstrap";

const CardList = (props) => {
  const cardlist = props.cardlist.map((item) => (
    <CardListItem
      key={item[0]}
      id={item[0]}
      count={item.length}
      data={props.data.filter((card) => card.id == item[0])[0]} // eslint-disable-line eqeqeq
      click={props.click}
    />
  ));
  return <ListGroup>{cardlist}</ListGroup>;
};

export default CardList;
