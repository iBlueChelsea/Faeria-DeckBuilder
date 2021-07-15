import React, { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./CardList/CardList";
import Card from "./Card/Card";
import SearchBar from "./SearchBar/SearchBar";
import {
  Badge,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

const Deck = (props) => {
  const [cardsState, setCardsState] = useState([]);
  const [deckState, setDeckState] = useState(props.data);
  const [landFilterState, setLandFilterState] = useState({
    neutral: false,
    forest: false,
    desert: false,
    mountain: false,
    lake: false,
  });
  const [nameFilterState, setNameFilterState] = useState("");

  useEffect(() => {
    axios
      .get("/faeria/Faeria/utils/getCards.php", {
        params: {
          name: nameFilterState,
          land: Object.keys(landFilterState).find(
            (key) => landFilterState[key]
          ),
        },
      })
      .then((res) => {
        res.data.forEach((card) => {
          const array = cardlist.find((arr) => arr.includes(parseInt(card.id)));
          if (card.legendary === "1") {
            !array || array.length < 1
              ? (card.playable = true)
              : (card.playable = false);
          } else {
            !array || array.length < 3
              ? (card.playable = true)
              : (card.playable = false);
          }
        });
        setCardsState(res.data);
      })
      .catch((error) => {
        console.log("Network Error", error.message);
      });
  }, [landFilterState, nameFilterState]);

  useEffect(() => {
    const newCardsState = [...cardsState];
    newCardsState.forEach((card) => {
      const array = cardlist.find((arr) => arr.includes(parseInt(card.id)));
      if (card.legendary === "1") {
        !array || array.length < 1
          ? (card.playable = true)
          : (card.playable = false);
      } else {
        !array || array.length < 3
          ? (card.playable = true)
          : (card.playable = false);
      }
    });
    setCardsState(newCardsState);
  }, [deckState]);

  const cardlist = deckState.cards.reduce((prev, curr, i, cards) => {
    curr === cards[i - 1]
      ? prev[prev.length - 1].push(curr)
      : prev.push([curr]);
    return prev;
  }, []);

  const getAvgCost = (cards) => {
    let sum = 0;
    let count = 0;
    cards.forEach((id) => {
      count++;
      sum += parseInt(cardsState.filter((card) => card.id == id)[0].faeria); // eslint-disable-line eqeqeq
    });
    return count ? sum / count : 0;
  };

  const addCardHandler = (event) => {
    const newDeckState = { ...deckState };
    newDeckState.cards.push(parseInt(event.target.id));
    newDeckState.cards.sort((a, b) => a - b);
    newDeckState.cost = getAvgCost(newDeckState.cards);
    setDeckState(newDeckState);
  };

  const removeCardHandler = (event) => {
    const newDeckState = { ...deckState };
    newDeckState.cards.splice(
      newDeckState.cards.findIndex((card) => card == event.target.id), // eslint-disable-line eqeqeq
      1
    );
    newDeckState.cost = getAvgCost(newDeckState.cards);
    setDeckState(newDeckState);
  };

  const cards = cardsState.map((card, i) => (
    <Card key={card.id} click={addCardHandler} data={card} />
  ));

  const saveDeck = () => {
    const data = new FormData();
    data.append("user", document.getElementById("user").value);
    data.append("deck", JSON.stringify(deckState));
    axios
      .post("/faeria/Faeria/utils/saveDeck.php", data)
      .then(() => {
        props.click();
      })
      .catch((error) => {
        console.log("Network Error", error.message);
      });
  };

  const cancelDeck = () => {
    props.click();
  };

  const saveButton =
    deckState.cards.length === 30 ? (
      <Button onClick={saveDeck} variant="primary" size="lg">
        Save
      </Button>
    ) : (
      <Button disabled variant="secondary" size="lg">
        Save
      </Button>
    );

  const setName = (event) => {
    const newDeckState = { ...deckState };
    newDeckState.deck_name = event.target.value;
    setDeckState(newDeckState);
  };

  const setCover = (event) => {
    const newDeckState = { ...deckState };
    newDeckState.cover = event.target.id;
    setDeckState(newDeckState);
  };

  const changeLandFilter = (event) => {
    const newLandFilterState = { ...landFilterState };
    newLandFilterState[event.target.id] = !newLandFilterState[event.target.id];
    Object.keys(newLandFilterState)
      .filter((key) => key !== event.target.id)
      .forEach((land) => (newLandFilterState[land] = false));
    setLandFilterState(newLandFilterState);
  };

  const changeNameFilter = (event) => {
    setNameFilterState(event.target.value);
  };

  const cover =
    cardsState.length > 0
      ? cardsState.find((card) => card.id == deckState.cover)
        ? cardsState.find((card) => card.id == deckState.cover).name
        : "No cover"
      : null;
  const options = cover
    ? cardlist.map((item) => (
        <Dropdown.Item key={item[0]} id={item[0]} onClick={setCover}>
          {cardsState.find((card) => card.id == item[0]).name}
        </Dropdown.Item>
      ))
    : null;

  return (
    <div style={{ display: "flex" }}>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "80vh",
            width: "70vw",
            justifyContent: "space-evenly",
            overflow: "scroll",
          }}
        >
          {cards}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "20vh",
            width: "70vw",
            justifyContent: "space-evenly",
          }}
        >
          <SearchBar
            landFilter={landFilterState}
            nameFilter={nameFilterState}
            changeLandFilter={changeLandFilter}
            changeNameFilter={changeNameFilter}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30vw",
          height: "100vh",
          justifyContent: "flex-start",
          overflow: "scroll",
        }}
      >
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <Badge pill variant="primary">
                {parseFloat(deckState.cost).toFixed(1)}
              </Badge>
            </InputGroup.Text>
            <InputGroup.Text>{deckState.cards.length}/30</InputGroup.Text>
            <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={setName}
            placeholder={deckState.deck_name}
            aria-label={deckState.deck_name}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon2">Cover:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={setName}
            readOnly
            defaultValue={cover}
            aria-label={cover}
            aria-describedby="basic-addon2"
          />
          <DropdownButton
            as={InputGroup.Append}
            variant="secondary"
            title="Select"
            id="input-group-dropdown-2"
          >
            {options}
          </DropdownButton>
        </InputGroup>
        <CardList
          cardlist={cardlist}
          data={cardsState}
          click={removeCardHandler}
        />
        {saveButton}
        <Button onClick={cancelDeck} variant="dark" size="lg">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Deck;
