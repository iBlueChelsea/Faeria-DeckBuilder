import React, { useState } from "react";
import Deck from "./Deck/Deck";
import DeckList from "./DeckList/DeckList";

const DeckBuilder = () => {
  const [isListView, setIsListView] = useState(true);
  const [deck, setDeck] = useState({});

  const onClickHandler = (event) => {
    setDeck(JSON.parse(event.target.attributes.data.value));
    setIsListView(false);
  };

  const returnHandler = () => {
    setDeck({});
    setIsListView(true);
  };

  const display = isListView ? (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        height: "100vh",
        width: "100vw",
        justifyContent: "space-evenly",
        overflow: "scroll",
      }}
    >
      <DeckList click={onClickHandler} />
    </div>
  ) : (
    <Deck data={deck} click={returnHandler} />
  );

  return display;
};

export default DeckBuilder;
