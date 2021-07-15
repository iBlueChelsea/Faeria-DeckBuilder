import React from "react";
import Hexagon from "./Hexagon/Hexagon";
import { InputGroup, FormControl } from "react-bootstrap";
import "./Searchbar.css";

const SearchBar = (props) => {
  const hexSize = 40;
  const landBar = Object.keys(props.landFilter).map((land, i) => (
    <g key={land}>
      <Hexagon
        id={land}
        className={land + (props.landFilter[land] ? "-active" : "")}
        hexSize={hexSize}
        startPosX={hexSize * i * 2.5 + 8}
        startPosY={hexSize - hexSize * Math.sqrt(3) * 0.5}
        click={props.changeLandFilter}
      />
    </g>
  ));
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <InputGroup style={{ width: "50%", alignItems: "center" }}>
        <FormControl
          onChange={props.changeNameFilter}
          placeholder="Search by name"
          aria-label="name"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <svg width="100%" height="80px">
        {landBar}
      </svg>
    </div>
  );
};

export default SearchBar;
