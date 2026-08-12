import React from 'react';
import {
  WidgetContainer,
  CounterBadge,
  TimerDisplay,
  WidgetButtonGroup,
  WidgetButton,
} from './todayTask.styles';
import {
  formatTimerDisplay,
  getTimerRemainingMs,
  canUseWidgetControls,
  isWidgetInactive,
} from '../../utils/taskWidget';

const stopDragPropagation = (e) => {
  e.stopPropagation();
};

const preventDragHandle = {
  onMouseDown: stopDragPropagation,
  onTouchStart: stopDragPropagation,
  onPointerDown: stopDragPropagation,
};

const TaskWidget = ({
  task,
  onIncrement,
  onTimerStart,
  onTimerPause,
  onTimerReset,
  tick,
}) => {
  const widget = task.widget;
  if (!widget) return null;

  if (widget.type === 'counter') {
    const atMax = (widget.current ?? 0) >= (widget.target ?? 1);
    const inactive = isWidgetInactive(task);
    return (
      <WidgetContainer>
        <CounterBadge
          type="button"
          {...preventDragHandle}
          onClick={(e) => {
            stopDragPropagation(e);
            if (inactive || atMax) return;
            onIncrement(task.id);
          }}
          $complete={atMax}
          $inactive={inactive}
          aria-label={`Compteur ${widget.current ?? 0} sur ${widget.target}`}
        >
          {widget.current ?? 0}/{widget.target}
        </CounterBadge>
      </WidgetContainer>
    );
  }

  if (widget.type === 'timer') {
    const remainingMs = getTimerRemainingMs(widget);
    const isRunning = widget.isRunning;
    const isDone = remainingMs === 0 && !isRunning;

    const inactive = isWidgetInactive(task);

    return (
      <WidgetContainer $horizontal>
        <TimerDisplay key={tick} $done={isDone} $inactive={inactive}>{formatTimerDisplay(remainingMs)}</TimerDisplay>
        {canUseWidgetControls(task) && (
          <WidgetButtonGroup {...preventDragHandle}>
            {!isDone && !isRunning && (
              <WidgetButton
                type="button"
                {...preventDragHandle}
                onClick={(e) => { stopDragPropagation(e); onTimerStart(task.id); }}
              >
                Start
              </WidgetButton>
            )}
            {!isDone && isRunning && (
              <WidgetButton
                type="button"
                {...preventDragHandle}
                onClick={(e) => { stopDragPropagation(e); onTimerPause(task.id); }}
              >
                Pause
              </WidgetButton>
            )}
            <WidgetButton
              type="button"
              variant="secondary"
              {...preventDragHandle}
              onClick={(e) => { stopDragPropagation(e); onTimerReset(task.id); }}
            >
              Reset
            </WidgetButton>
          </WidgetButtonGroup>
        )}
      </WidgetContainer>
    );
  }

  return null;
};

export default TaskWidget;
