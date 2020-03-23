import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import APIManager from "./utils/APIManager";
import Card from "./components/Card";
import "./styles.scss";

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const pokemon = await APIManager.getPokemonById(index);
      setSelectedPokemon(pokemon);
      setIsLoading(false);
    };
    fetchData();
  }, [index]);

  const handleIncrement = async () => {
    const newIndex = index + 1;
    setIndex(newIndex);
    const newPokemon = await APIManager.getPokemonById(newIndex);
    setSelectedPokemon(newPokemon);
  };

  const handleDecrement = async () => {
    const newIndex = index - 1;
    if (!newIndex > 0) return;
    setIndex(newIndex);
    const newPokemon = await APIManager.getPokemonById(newIndex);
    setSelectedPokemon(newPokemon);
  };

  return (
    <div className="App">
      <div className="decrement" onClick={handleDecrement}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      {!isLoading && selectedPokemon && <Card pokemon={selectedPokemon} />}
      <div className="increment" onClick={handleIncrement}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}
