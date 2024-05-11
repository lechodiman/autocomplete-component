import React, { useState, useEffect } from 'react';
import './Autocomplete.css';

interface IProps {
  options: string[];
  userInput: string;
  onUserInput: (input: string) => void;
}

const Autocomplete: React.FC<IProps> = ({ options, userInput, onUserInput }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Mock API call
    const fetchData = async () => {
      // Replace this with your actual API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(options), 300)
      );
      setFilteredOptions(response as string[]);
    };

    fetchData();
  }, [options]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveOption(0);
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
    onUserInput(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    onUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(false);
      onUserInput(filteredOptions[activeOption]);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1);
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
