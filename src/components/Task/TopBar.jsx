import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary, Link } from '../atoms';
import { FaTrash, FaRedo, FaQuestionCircle } from 'react-icons/fa';

const Navigation = styled.nav`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: 520px) {
    flex-direction: column-reverse;
    padding: 0 20px;
    gap: 10px;
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

const TopBar = ({ onAddTask, onClearTasks, onResetTasks, onShowHelp }) => (
  <>
    <HelpButton onClick={onShowHelp} title="Afficher le guide d'utilisation">
      <FaQuestionCircle /> Aide
    </HelpButton>
    <Navigation>
      <ButtonPrimary onClick={onAddTask}>+ Ajouter une tâche</ButtonPrimary>
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