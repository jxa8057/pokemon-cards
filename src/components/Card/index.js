import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { firstLetterToUpperCase, getNRandomItems } from "../../utils/functions";
import TYPE_ICONS from "../../utils/typeIcons";
import "./Card.scss";

const Card = props => {
  const {
    name,
    height,
    weight,
    stats,
    types,
    moves: allMoves,
    sprites: { front_default: image }
  } = props.pokemon;
  const [moves, setMoves] = useState([]);
  useEffect(() => {
    initMoves();
    // eslint-disable-next-line no-use-before-define
  }, [initMoves]);

  const initMoves = useCallback(async () => {
    // Get random moves from list
    const randomMoves = getNRandomItems(2, allMoves).map(move => move.move);
    // Add all move details calls to array
    const detailPromises = [];
    for (let i = 0; i < randomMoves.length; i++) {
      const move = randomMoves[i];
      const { url } = move;
      detailPromises.push(axios.get(url));
    }
    const detailResponses = await Promise.all(detailPromises);
    const details = detailResponses.map(response => response.data);

    // Pull out the info we actually care about
    const parsedMoves = details.map(move => {
      const { power } = move;
      let { name, type } = move;
      name = firstLetterToUpperCase(name);
      type = firstLetterToUpperCase(type.name);

      const description = move.flavor_text_entries.find(entry => {
        return entry.language.name === "en";
      }).flavor_text;

      return { name, power, type, description };
    });
    setMoves(parsedMoves);
  }, [allMoves]);

  // Get base HP
  const { base_stat: baseHp } = stats.find(statObj => {
    if (statObj.stat.name === "hp") return true;
    return false;
  });

  // Get primary pokemon type
  const type = types.find(typeObj => {
    if (typeObj.slot === 1) return true;
    return false;
  }).type.name;

  const displayName = firstLetterToUpperCase(name);
  const displayType = firstLetterToUpperCase(type);
  return (
    <div className={`card-container ${type}`}>
      <div className="header-container">
        <div className="left-header-container">
          <div className="type">{displayType} Pokémon</div>
          <div className="name">{displayName}</div>
        </div>
        <div className="right-header-container">
          <div className="hp">{baseHp} HP</div>
          <img src={TYPE_ICONS[type.toLowerCase()]} alt={`${type} pokemon`} />
        </div>
      </div>
      <div className="image-section-container">
        <div className="image-container">
          <img src={image} alt="pokemon" />
        </div>
        <div className="image-caption">
          height: {height}'' weight: {weight} lbs
        </div>
      </div>
      <div className="moves-container">
        {moves.map(move => {
          const { name, type, power, description } = move;
          return (
            <div className="move-container" key={name}>
              <div className="types-icon-container">
                <img
                  src={TYPE_ICONS[type.toLowerCase()]}
                  alt={`${type} type`}
                />
              </div>
              <div className="move-center-container">
                <div className="move">
                  <span className="move-name">{name} </span>
                  {description}
                </div>
              </div>
              <div className="move-damage">{power}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
