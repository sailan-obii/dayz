import React, { useState, useEffect } from 'react';
import {
  Task,
  DeleteButton,
  EditForm,
  EditInput,
  EditTextarea,
  ButtonGroup,
  Button,
  TaskContent,
  TaskText,
  OptionsToggle,
  OptionsPanel,
  OptionsLabel,
  OptionsRow,
  OptionsInput,
  RemoveOptionButton,
} from './todayTask.styles';
import TaskIcon from './TaskIcon.jsx';
import TaskWidget from './TaskWidget.jsx';
import { deduceCounterTarget, deduceTimerMinutes } from '../../utils/deduceWidgetValue';
import {
  createCounterWidget,
  createTimerWidget,
  clampWidgetValue,
  MAX_TIMER_MINUTES,
} from '../../utils/taskWidget';

// `#mot` → gras (un mot : lettres, chiffres, apostrophes, tirets).
// `~phrase~` → barré (un ou plusieurs mots, le ~ n'est pas affiché).
const STRIKE_PHRASE_PATTERN = /~([^~]+)~/g;

const formatBoldWords = (text, nextKey) => {
  const pattern = /(?<![\p{L}\p{N}])#([\p{L}\p{N}][\p{L}\p{N}'’-]*)/gu;
  const nodes = [];
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(<strong key={nextKey()}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const formatTaskText = (text = '') => {
  const withBreaks = String(text).replace(/\./g, '.\n');
  const nodes = [];
  let lastIndex = 0;
  let key = 0;
  const nextKey = () => key++;

  STRIKE_PHRASE_PATTERN.lastIndex = 0;

  for (const match of withBreaks.matchAll(STRIKE_PHRASE_PATTERN)) {
    if (match.index > lastIndex) {
      nodes.push(...formatBoldWords(withBreaks.slice(lastIndex, match.index), nextKey));
    }
    nodes.push(<s key={nextKey()}>{formatBoldWords(match[1], nextKey)}</s>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < withBreaks.length) {
    nodes.push(...formatBoldWords(withBreaks.slice(lastIndex), nextKey));
  }

  return nodes;
};

const buildWidgetFromEdit = (widgetType, widgetValue, existingTask) => {
  if (!widgetType) return undefined;

  if (widgetType === 'counter') {
    const target = clampWidgetValue(widgetValue);
    if (target === null) return undefined;
    const previous = existingTask.widget?.type === 'counter' ? existingTask.widget : null;
    return createCounterWidget(target, previous?.target === target ? (previous.current ?? 0) : 0);
  }

  if (widgetType === 'timer') {
    const targetMinutes = clampWidgetValue(widgetValue, MAX_TIMER_MINUTES);
    if (targetMinutes === null) return undefined;
    const previous = existingTask.widget?.type === 'timer' ? existingTask.widget : null;
    if (previous && previous.targetMinutes === targetMinutes) {
      return { ...previous };
    }
    return createTimerWidget(targetMinutes);
  }

  return undefined;
};

const EditableTask = ({
  task,
  isEditing,
  onSave,
  onCancel,
  onDelete,
  onIncrement,
  onTimerStart,
  onTimerPause,
  onTimerReset,
  timerTick,
  provided,
  snapshot,
}) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [showOptions, setShowOptions] = useState(!!task.widget);
  const [widgetType, setWidgetType] = useState(task.widget?.type ?? null);
  const [widgetValue, setWidgetValue] = useState(
    String(task.widget?.target ?? task.widget?.targetMinutes ?? '')
  );
  const [valueManuallySet, setValueManuallySet] = useState(!!task.widget);

  useEffect(() => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setShowOptions(!!task.widget);
    setWidgetType(task.widget?.type ?? null);
    setWidgetValue(String(task.widget?.target ?? task.widget?.targetMinutes ?? ''));
    setValueManuallySet(!!task.widget);
  }, [task.id, task.title, task.description, task.widget]);

  const deduceValueForType = (type) => {
    if (type === 'counter') return deduceCounterTarget(editedTitle, editedDescription);
    if (type === 'timer') return deduceTimerMinutes(editedTitle, editedDescription);
    return null;
  };

  const handleWidgetTypeChange = (type) => {
    setWidgetType(type);
    if (!valueManuallySet || !widgetValue) {
      const deduced = deduceValueForType(type);
      if (deduced !== null) {
        setWidgetValue(String(deduced));
      }
    }
  };

  const handleWidgetValueChange = (e) => {
    setWidgetValue(e.target.value);
    setValueManuallySet(true);
  };

  const handleRemoveWidget = () => {
    setWidgetType(null);
    setWidgetValue('');
    setValueManuallySet(false);
    setShowOptions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const widget = buildWidgetFromEdit(widgetType, widgetValue, task);
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
    };
    if (widget) {
      updatedTask.widget = widget;
    } else {
      delete updatedTask.widget;
    }
    onSave(updatedTask);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  if (isEditing) {
    return (
      <Task
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        status={task.status}
      >
        <DeleteButton onClick={handleDeleteClick} type="button" />
        <EditForm onSubmit={handleSubmit}>
          <EditInput
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Titre de la tâche"
            required
            autoFocus
          />
          <EditTextarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description (~phrase barrée~, #gras)"
          />
          {!showOptions ? (
            <OptionsToggle type="button" onClick={() => setShowOptions(true)}>
              + d&apos;options
            </OptionsToggle>
          ) : (
            <OptionsPanel>
              <OptionsLabel>
                <input
                  type="radio"
                  name={`widget-type-${task.id}`}
                  checked={widgetType === 'counter'}
                  onChange={() => handleWidgetTypeChange('counter')}
                />
                Compteur
              </OptionsLabel>
              <OptionsLabel>
                <input
                  type="radio"
                  name={`widget-type-${task.id}`}
                  checked={widgetType === 'timer'}
                  onChange={() => handleWidgetTypeChange('timer')}
                />
                Countdown
              </OptionsLabel>
              {widgetType === 'counter' && (
                <OptionsRow>
                  Objectif :
                  <OptionsInput
                    type="number"
                    min="1"
                    max="999"
                    value={widgetValue}
                    onChange={handleWidgetValueChange}
                    placeholder="8"
                  />
                </OptionsRow>
              )}
              {widgetType === 'timer' && (
                <OptionsRow>
                  Durée :
                  <OptionsInput
                    type="number"
                    min="1"
                    max="480"
                    value={widgetValue}
                    onChange={handleWidgetValueChange}
                    placeholder="20"
                  />
                  min
                </OptionsRow>
              )}
              {widgetType && (
                <RemoveOptionButton type="button" onClick={handleRemoveWidget}>
                  Retirer l&apos;option
                </RemoveOptionButton>
              )}
            </OptionsPanel>
          )}
          <ButtonGroup>
            <Button type="submit">Enregistrer</Button>
            <Button type="button" variant="cancel" onClick={onCancel}>
              Annuler
            </Button>
          </ButtonGroup>
        </EditForm>
      </Task>
    );
  }

  return (
    <Task
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragging={snapshot.isDragging}
      status={task.status}
    >
      <DeleteButton onClick={handleDeleteClick} type="button" />
      <TaskContent>
        <TaskIcon title={task.title} />
        <TaskText>
          <h3>{task.title}</h3>
          <p>{formatTaskText(task.description)}</p>
          <TaskWidget
            task={task}
            onIncrement={onIncrement}
            onTimerStart={onTimerStart}
            onTimerPause={onTimerPause}
            onTimerReset={onTimerReset}
            tick={timerTick}
          />
        </TaskText>
      </TaskContent>
    </Task>
  );
};

export default EditableTask;
