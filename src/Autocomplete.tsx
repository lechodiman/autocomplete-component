import React, { useState } from 'react';
import './Autocomplete.css';

interface IProps {
  options: string[];
  userInput: string;
  onUserInput: (input: string) => void;
}

const Autocomplete: React.FC<IProps> = ({ options, userInput, onUserInput }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter(
    (optionName) => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveOption(0);
    setShowOptions(true);
    onUserInput(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setActiveOption(0);
    setShowOptions(false);
    onUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        setActiveOption(0);
        setShowOptions(false);
        onUserInput(filteredOptions[activeOption]);
        break;
      case 'ArrowUp':
        if (activeOption > 0) {
          setActiveOption(activeOption - 1);
        }
        break;
      case 'ArrowDown':
        if (activeOption < filteredOptions.length - 1) {
          setActiveOption(activeOption + 1);
        }
        break;
      default:
        break;
    }
  };

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className='options'>
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = 'option-active';
            }
            const matchedIndex = optionName
              .toLowerCase()
              .indexOf(userInput.toLowerCase());
            const matchedPart = optionName.slice(
              matchedIndex,
              matchedIndex + userInput.length
            );
            const beforeMatch = optionName.slice(0, matchedIndex);
            const afterMatch = optionName.slice(matchedIndex + userInput.length);
            return (
              <li className={className} key={optionName} onClick={onClick}>
                {beforeMatch}
                <span className='highlight'>{matchedPart}</span>
                {afterMatch}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className='no-options'>
          <em>No Option!</em>
        </div>
      );
    }
  }

  return (
    <>
      <div className='search'>
        <input
          type='text'
          className='search-box'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {optionList}
      </div>
    </>
  );
};

export default Autocomplete;
