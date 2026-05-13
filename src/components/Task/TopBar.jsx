import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary, Link } from '../atoms';
import { FaTrash, FaRedo, FaQuestionCircle } from 'react-icons/fa';
import SearchBar from './SearchBar';

const Navigation = styled.nav`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  position: relative;
  flex-wrap: wrap;

  @media (max-width: 710px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin: 30px 10px 0;
  }
`;

const LeftSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex: 1;
  min-width: 0;

  @media (max-width: 710px) {
    display: contents;
  }
`;

const ActionLinks = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 710px) {
    width: 100%;
    justify-content: center;
    order: 2;
  }
`;

const ButtonWrapper = styled.div`
  @media (max-width: 710px) {
    display: none;
  }
`;

const ButtonFixed = styled.button`
  display: none;
  @media (max-width: 710px) {
    display: inline;
    position: fixed;
    bottom: 60px;
    right: 20px;
    max-width: 130px;
    padding: 10px 20px;
    background: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 30px;
    transition: all 0.2s ease-in-out;
    z-index: 10;

    &::before {
      content: "";
      position: absolute;
      inset: -3px;
      border-radius: 0.5rem;
      background: linear-gradient(45deg, #00fff7, #ff00f7);
      z-index: -1;
      padding: 3px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }

    &:hover {
      z-index: 0;
      color: #fff;
      background: #1906ff3b;
    }
  }
`;

const SearchWrapper = styled.div`
  @media (max-width: 710px) {
    order: 3;
    width: 100%;
  }
`;

const HelpButton = styled(Link)`
  display: block;
  position: absolute;
  right: 0;
  top: 50px;
  margin: 6px;
  border: none;
  background: #3c3c3c2e;
`;

const TopBar = ({ onAddTask, onClearTasks, onResetTasks, onShowHelp, searchTerm, onSearchChange, onSearchClear }) => (
  <>
    <HelpButton onClick={onShowHelp} title="Afficher le guide d'utilisation">
      <FaQuestionCircle /> Aide
    </HelpButton>
    <ButtonFixed onClick={onAddTask}>+</ButtonFixed>
    <Navigation>
      <LeftSection>
        <ButtonWrapper>
          <ButtonPrimary onClick={onAddTask}>+ Ajouter une tâche</ButtonPrimary>
        </ButtonWrapper>
        <SearchWrapper>
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            onClear={onSearchClear}
          />
        </SearchWrapper>
      </LeftSection>
      <ActionLinks>
        <Link onClick={onClearTasks}>
            <FaTrash /> Vider les tâches
        </Link>
        <Link onClick={onResetTasks}>
            <FaRedo /> Tâches par défaut
        </Link>
      </ActionLinks>
    </Navigation>
  </>
);

export default TopBar;