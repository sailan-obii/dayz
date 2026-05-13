import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  flex: 1;
  max-width: 400px;

  @media (max-width: 520px) {
    width: 100%;
    max-width: none;
    order: -1;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  outline: none;
  padding: 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    color: rgba(255, 255, 255, 1);
  }

  &::selection {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <SearchContainer>
      <SearchIcon aria-hidden="true" />
      <SearchInput
        type="text"
        placeholder="Rechercher une tâche..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Rechercher les tâches par titre ou description"
      />
      {value && (
        <ClearButton
          onClick={onClear}
          type="button"
          aria-label="Effacer la recherche"
          title="Effacer"
        >
          <FaTimes />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
