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

  @media (max-width: 520px) {
    flex-direction: column-reverse;
    padding: 0 20px;
    gap: 10px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex: 1;
  min-width: 0;

  @media (max-width: 520px) {
    width: 100%;
    order: 2;
  }
`;

const ActionLinks = styled.div`
  display: flex;
  @media (max-width: 520px) {
    display: block;
    width: 100%;
    overflow: hidden;
  }
`;

const HelpButton = styled(Link)`
  display: block;
  position: absolute;
  right: 0;
  top: 50px;
`;

const TopBar = ({ onAddTask, onClearTasks, onResetTasks, onShowHelp, searchTerm, onSearchChange, onSearchClear }) => (
  <>
    <HelpButton onClick={onShowHelp} title="Afficher le guide d'utilisation">
      <FaQuestionCircle /> Aide
    </HelpButton>
    <Navigation>
      <LeftSection>
        <ButtonPrimary onClick={onAddTask}>+ Ajouter une tâche</ButtonPrimary>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          onClear={onSearchClear}
        />
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