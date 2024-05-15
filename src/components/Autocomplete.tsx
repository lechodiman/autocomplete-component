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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const filteredOptions = options.filter(
    (optionName) => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );

  const paginatedOptions = filteredOptions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
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
    setCurrentPage(0);
    setShowOptions(true);
    onUserInput(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setActiveOption(0);
    setCurrentPage(0);
    setShowOptions(false);
    onUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        setActiveOption(0);
        setCurrentPage(0);
        setShowOptions(false);
        onUserInput(filteredOptions[activeOption]);
        break;
      case 'ArrowUp':
        e.preventDefault();

        if (activeOption === 0 && currentPage > 0) {
          setCurrentPage(currentPage - 1);
          setActiveOption(itemsPerPage - 1);
        } else if (activeOption > 0) {
          setActiveOption(activeOption - 1);
        }

        break;
      case 'ArrowDown':
        if (
          activeOption === paginatedOptions.length - 1 &&
          currentPage < Math.ceil(filteredOptions.length / itemsPerPage) - 1
        ) {
          setCurrentPage(currentPage + 1);
          setActiveOption(0);
        } else if (activeOption < paginatedOptions.length - 1) {
          setActiveOption(activeOption + 1);
        }

        break;
      default:
        break;
    }
  };

  let optionList;
  if (showOptions && userInput) {
    if (!paginatedOptions.length) {
      optionList = (
        <div className='autocomplete__no-options'>
          <em>No Option!</em>
        </div>
      );
    } else {
      optionList = (
        <ul className='autocomplete__options'>
          {paginatedOptions.map((optionName, index) => {
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
              <li className={className} key={optionName} onClick={onClick} role='option'>
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
        role='combobox'
        aria-autocomplete='list'
      />
      {optionList}
    </div>
  );
};

export default Autocomplete;
