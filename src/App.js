import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import APIManager from "./utils/APIManager";
import Card from "./components/Card";
import "./styles.scss";
import AutoComplete from "./components/AutoComplete";

export default function App() {
  const [allPokemonNames, setAllPokemonNames] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Get all pokemon names for autocomplete
   */
  useEffect(() => {
    const fetchData = async () => {
      const allPokemonNames = await APIManager.getAllPokemonNames();
      setAllPokemonNames(allPokemonNames);
    };
    fetchData();
  }, []);

  /**
   * Search for pokemon on ID change
   */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const pokemon = await APIManager.getPokemonById(index);
      setSelectedPokemon(pokemon);
      setIsLoading(false);
    };
    fetchData();
  }, [index]);

  /**
   * Allow increment up to 151
   */
  const handleIncrement = async () => {
    const newIndex = index + 1;
    if (newIndex > 151) return;
    setIndex(newIndex);
  };

  /**
   * Allow decrement to 0
   */
  const handleDecrement = async () => {
    const newIndex = index - 1;
    if (newIndex <= 0) return;
    setIndex(newIndex);
  };

  /**
   * Search for pokemon with full pokemon name from autocomplete
   * @param {string} pokemonName
   */
  const handlePokemonSearch = async pokemonName => {
    const newPokemon = await APIManager.getPokemonByName(pokemonName);
    setSelectedPokemon(newPokemon);
    setIndex(newPokemon.id);
  };

  return (
    <div className="App">
      <div className="decrement" onClick={handleDecrement}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className="app-center-container">
        {!isLoading && selectedPokemon && <Card pokemon={selectedPokemon} />}
        <AutoComplete
          options={allPokemonNames}
          handleSelect={handlePokemonSearch}
        />
      </div>
      <div className="increment" onClick={handleIncrement}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}
