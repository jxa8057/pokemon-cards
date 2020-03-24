import React, { useState } from "react";
import "./AutoComplete.scss";

const AutoComplete = props => {
  const { options, handleSelect } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [textBoxValue, setTextBoxValue] = useState([]);

  const handleUserInput = e => {
    const { value } = e.target;
    setTextBoxValue(value);
    if (value === "") return setSuggestions([]);
    const suggestions = options.filter(option =>
      option.includes(value.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  const handleSuggestionSelect = suggestion => {
    setSuggestions([]);
    setTextBoxValue(suggestion);
    handleSelect(suggestion);
  };

  return (
    <div className="autocomplete-container">
      <input value={textBoxValue} onChange={handleUserInput} />
      <ul>
        {suggestions.map(suggestion => (
          <li
            key={suggestion}
            onClick={() => handleSuggestionSelect(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
