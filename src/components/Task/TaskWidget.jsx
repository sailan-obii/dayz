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
  isCounterInactive,
} from '../../utils/taskWidget';

const stopDrag = (e) => {
  e.stopPropagation();
  e.preventDefault();
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
    const inactive = isCounterInactive(task);
    return (
      <WidgetContainer>
        <CounterBadge
          type="button"
          onClick={(e) => {
            stopDrag(e);
            if (inactive || atMax) return;
            onIncrement(task.id);
          }}
          onPointerDown={stopDrag}
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

    return (
      <WidgetContainer $horizontal>
        <TimerDisplay key={tick} $done={isDone}>{formatTimerDisplay(remainingMs)}</TimerDisplay>
        {canUseWidgetControls(task) && (
          <WidgetButtonGroup>
            {!isDone && !isRunning && (
              <WidgetButton
                type="button"
                onClick={(e) => { stopDrag(e); onTimerStart(task.id); }}
                onPointerDown={stopDrag}
              >
                Start
              </WidgetButton>
            )}
            {!isDone && isRunning && (
              <WidgetButton
                type="button"
                onClick={(e) => { stopDrag(e); onTimerPause(task.id); }}
                onPointerDown={stopDrag}
              >
                Pause
              </WidgetButton>
            )}
            <WidgetButton
              type="button"
              variant="secondary"
              onClick={(e) => { stopDrag(e); onTimerReset(task.id); }}
              onPointerDown={stopDrag}
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
