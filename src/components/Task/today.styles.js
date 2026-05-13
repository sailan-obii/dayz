import styled from 'styled-components';
import { getColorByStatus } from './colors';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const TaskBoardContainer = styled.section`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    display: contents;
    flex-direction: row;
    width: 100%;
  }
`;

export const BaseColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0px;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Column = styled(BaseColumn)`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 10.25%, rgba(255, 255, 255, 0.04) 96.75%);
  border: 1px solid rgba(255, 255, 255, 0.22);

  @media (max-width: 768px) {
    width: 90%;
    margin: 10px;
    padding: 10px;
  }
`;

export const SectionHeader = styled.h2`
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
  color: ${props => getColorByStatus(props.status)};
  border-bottom-color: ${props => getColorByStatus(props.status)};
  font-size: 18px;
`;

export const ColumnBacklog = styled(BaseColumn)`
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 10.25%, rgba(255, 255, 255, 0.04) 96.75%);
  border: 1px solid rgba(255, 255, 255, 0.22);

  @media (max-width: 768px) {
    margin: 10px;
    width: 90%;
  }
`;

export const ColumnBacklogHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
  color: #c1c1c1;
  border-bottom-color: #7b7b7b;
  font-size: 18px;

  @media (max-width: 620px) {
    flex-direction: column;
  }

  .backlog-actions {
    display: flex;
    gap: 10px;
  }

  .backlog-actions a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 5px;

    color: rgba(255, 255, 255, 0.6);
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
`;

export const TaskList = styled.div`
  flex-grow: 1;
  background: ${props => (props.isDraggingOver ? '#f0f7ff42' : 'transparent')};
  transition: background-color 0.2s ease;
  border-radius: 5px;
  padding: 8px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;

  &.backlog-task-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .backlog-task {
    width: 280px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .backlog-task > div {
    margin-bottom: -30px;
  }
`;

export const StickyMenu = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  border-top: 1px solid #662355;
  display: flex;
  justify-content: space-around;
  padding: 0;
  z-index: 1000;

  a {
    flex: 1; /* Permet aux boutons de prendre un espace égal */
    text-align: center;
    text-decoration: none;
    
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    padding: 10px 0;
    border-right: 1px solid #593a43; /* Ajoute une bordure entre les boutons */

    &:last-child {
      border-right: none; /* Supprime la bordure pour le dernier bouton */
    }

    &.todo {
      color: #ffe100; 
    }

    &.en-cours {
      color: #0ff; 
    }

    &.termine {
      color: #2aff00;
    }
  }

  @media (min-width: 768px) {
    display: none; /* Cache le menu sur les écrans plus larges */
  }
`;
