import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/";

const getPokemonByName = async name => {
  const { data } = await axios.get(`${baseUrl}pokemon/${name}/`);
  return data;
};
const getPokemonById = async id => {
  const { data } = await axios.get(`${baseUrl}pokemon/${id}/`);
  return data;
};
const getNPokemon = async num => {
  const {
    data: { results }
  } = await axios.get(`${baseUrl}pokemon/?offset=0&limit=${num}`);
  return results;
};

export default { getPokemonByName, getPokemonById, getNPokemon };
