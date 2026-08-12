
import styled from 'styled-components';
import { colors, getColorByStatus, getColorDarkByStatus } from './colors';
export const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: #ff4444;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right:40px;
`;

export const EditInput = styled.input`
  padding: 8px;
  border: none;
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 14px;
  width: 100%;
  &:focus-visible {
     outline: 2px solid #000;
  }
`;

export const EditTextarea = styled.textarea`
  padding: 8px;
  border: none;
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 14px;
  width: 100%;
  resize: vertical;
  min-height: 60px;
  &:focus-visible {
     outline: 2px solid #000;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 14px;
  background: ${props => props.variant === 'cancel' ? 'white' : 'black'};
  color: ${props => props.variant === 'cancel' ? '#333' : 'white'};

  &:hover {
    background: ${props => props.variant === 'cancel' ? '#e0e0e0' : '#1906ffaa'};
  }
`;






// Modification du style Task pour gérer le positionnement relatif
export const Task = styled.div`
  position: relative;
  border-radius: 1px;
  padding: 15px;
  margin-bottom: 10px;
  background: ${props => getColorByStatus(props.status)};
  border-top: 4px solid ${props => getColorDarkByStatus(props.status)};;
  box-shadow: ${props => props.isDragging ? '0 5px 10px rgba(0, 0, 0, 0.15)' : '0 2px 3px rgba(0, 0, 0, 0.05)'};
  user-select: none;
  height: ${props => props.status === 'backlog' ? '100%' : 'auto'};
  
  &:hover {
    background-color: ${props => {
      switch (props.status) {
        case 'todo': return colors.yellowLight;
        case 'en cours': return colors.blueLight;
        case 'terminé': return colors.greenLight;
        default: return '#ccc';
      }
    }};
  }

  h3 {
    color: #000;
    font-size: 14px;
    margin: 0 0 8px 0;
    padding-right: 24px; // Espace pour le bouton de suppression
    overflow-wrap: break-word;
  }

  p {
    font-size: 12px;
    margin: 0;
    color: #000;
    overflow-wrap: break-word;
  }
`;

export const TaskContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TaskText = styled.div`
  flex: 1;
`;

export const DragHandle = styled.div`
  cursor: grab;
  color: #666;
  font-size: 14px;
  line-height: 1;
  padding: 2px 4px;
  flex-shrink: 0;
  opacity: 0.5;

  &:active {
    cursor: grabbing;
  }
`;

export const OptionsToggle = styled.button`
  padding: 6px 10px;
  border: 1px dashed #666;
  border-radius: 0.3rem;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  text-align: right;
  color: #333;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const OptionsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.3rem;
`;

export const OptionsLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
  color: #000;
`;

export const OptionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #000;
`;

export const OptionsInput = styled.input`
  padding: 6px 8px;
  border: none;
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 13px;
  width: 70px;

  &:focus-visible {
    outline: 2px solid #000;
  }
`;

export const RemoveOptionButton = styled.button`
  padding: 4px 8px;
  border: none;
  background: none;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  align-self: flex-start;

  &:hover {
    color: #ff4444;
  }
`;

export const WidgetContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: ${props => props.$horizontal ? 'row' : 'column'};
  align-items: ${props => props.$horizontal ? 'center' : 'stretch'};
  gap: 6px;
`;

export const CounterBadge = styled.button`
  align-self: flex-start;
  padding: 6px 14px;
  border: 2px solid ${props => props.$complete ? '#2e7d32' : props.$inactive ? '#bbb' : '#000'};
  border-radius: 1rem;
  background: ${props => props.$complete ? 'rgba(46, 125, 50, 0.15)' : props.$inactive ? 'rgba(0, 0, 0, 0.06)' : '#fffa'};
  font-size: 14px;
  font-weight: 600;
  cursor: ${props => (props.$complete || props.$inactive) ? 'default' : 'pointer'};
  color: ${props => props.$inactive && !props.$complete ? '#888' : '#000'};
  opacity: ${props => props.$inactive && !props.$complete ? 0.7 : 1};

  &:hover {
    background: ${props => {
    if (props.$inactive && !props.$complete) return 'rgba(0, 0, 0, 0.06)';
    if (props.$complete) return 'rgba(46, 125, 50, 0.15)';
    return 'rgba(0, 0, 0, 0.05)';
  }};
  }
`;

export const TimerDisplay = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${props => props.$done ? '#2e7d32' : props.$inactive ? '#888' : '#000'};
  opacity: ${props => props.$inactive && !props.$done ? 0.7 : 1};
`;

export const WidgetButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const WidgetButton = styled.button`
  padding: 4px 10px;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 12px;
  background: ${props => props.variant === 'secondary' ? 'white' : 'black'};
  color: ${props => props.variant === 'secondary' ? '#333' : 'white'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.85;
  }
`;