import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { formatSeasons } from "./utils/formatSeasons";
import fetchShow from "./api/fetchShow";

import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [showList] = useState(["The Expanse", "Altered Carbon", "Stranger Things"]);
  const [show, setShow] = useState(null);
  const [selectedShow, setSelectedShow] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    fetchShow().then((data) => {
      // console.log("fetched data", data);
      setShow(data);
      setSeasons(formatSeasons(data._embedded.episodes));
    });
  }, []);

  const handleSelectShow = (e) => {
    console.log("e.value is", e.value);

    fetchShow(e.value)
      .then((data) => {
        setShow(data);
        setSelectedShow(e.value);
        setSeasons(formatSeasons(data._embedded.episodes));
        setSelectedSeason("");
      })
      .catch((err) => console.log(err));
  };
  const handleSelectSeason = (e) => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App" data-testid="app">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.values(showList)}
        onChange={handleSelectShow}
        value={selectedShow || "Select a show"}
        placeholder="Select a show"
      />
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelectSeason}
        value={selectedSeason || "Select a season"}
        placeholder="Select a season"
        data-testid="seasonDropdown"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
