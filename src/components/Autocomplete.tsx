import React, { useRef, useState } from 'react';
import './Autocomplete.css';
import useOutsideClick from '../hooks/useOutsideClick';

export interface AutocompleteProps {
  options: string[];
  userInput: string;
  onUserInput: (input: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  userInput,
  onUserInput,
}) => {
  const [activeOption, setActiveOption] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter(
    (optionName) => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );

  const containerRef = useRef(null);

  useOutsideClick(containerRef, () => {
    if (showOptions) {
      onUserInput('');
      setShowOptions(false);
    }
  });

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
    if (!filteredOptions.length) {
      optionList = (
        <div className='autocomplete__no-options'>
          <em>No Option!</em>
        </div>
      );
    } else {
      optionList = (
        <ul className='autocomplete__options'>
          {filteredOptions.map((optionName, index) => {
            let className = 'autocomplete__options-item';
            if (index === activeOption) {
              className += ' autocomplete__options-item--active';
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
    }
  }

  return (
    <div ref={containerRef} className='autocomplete'>
      <input
        type='text'
        className='autocomplete__input'
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {optionList}
    </div>
  );
};

export default Autocomplete;
