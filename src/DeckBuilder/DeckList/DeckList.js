import React, { useState, useEffect } from "react";
import axios from "axios";
import DeckListItem from "./DeckListItem/DeckListItem";

const DeckList = (props) => {
  const [decksState, setDecksState] = useState([]);

  useEffect(() => {
    const data = new FormData();
    data.append("user", document.getElementById("user").value);
    axios
      .post("https://cheekia.loca.lt/faeria/Faeria/utils/getDecks.php", data)
      .then((res) => {
        setDecksState(res.data);
      })
      .catch((error) => {
        console.log("Network Error", error.message);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const decks = decksState.map((deck) => (
    <DeckListItem key={deck.id} data={deck} click={props.click} />
  ));
  decks.push(
    <DeckListItem
      key="0"
      data={{ id: 0, deck_name: "Add new", cover: 0, cards: [], cost: 0.0 }}
      click={props.click}
    />
  );
  return decks;
};

export default DeckList;
