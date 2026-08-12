export const MIN_WIDGET_VALUE = 1;
export const MAX_COUNTER_TARGET = 999;
export const MAX_TIMER_MINUTES = 480;

export function clampWidgetValue(value, max = MAX_COUNTER_TARGET) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < MIN_WIDGET_VALUE) return null;
  return Math.min(parsed, max);
}

export function getTimerRemainingMs(widget, now = Date.now()) {
  if (!widget || widget.type !== 'timer') return 0;
  if (widget.isRunning && widget.endAt) {
    return Math.max(0, widget.endAt - now);
  }
  if (widget.remainingMs != null) {
    return Math.max(0, widget.remainingMs);
  }
  return (widget.targetMinutes ?? 0) * 60 * 1000;
}

export function formatTimerDisplay(remainingMs) {
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function isCounterComplete(widget) {
  return widget?.type === 'counter' && (widget.current ?? 0) >= (widget.target ?? 1);
}

export function isTimerComplete(widget, now = Date.now()) {
  if (widget?.type !== 'timer') return false;
  if (widget.isRunning && widget.endAt) return widget.endAt <= now;
  return !widget.isRunning && widget.remainingMs === 0;
}

export function pauseTimerWidget(widget, now = Date.now()) {
  if (!widget || widget.type !== 'timer' || !widget.isRunning) return widget;
  return {
    ...widget,
    isRunning: false,
    endAt: null,
    remainingMs: Math.max(0, widget.endAt - now),
  };
}

export function startTimerWidget(widget, now = Date.now()) {
  if (!widget || widget.type !== 'timer' || widget.isRunning || isTimerComplete(widget, now)) {
    return widget;
  }
  const remainingMs = getTimerRemainingMs(widget, now);
  if (remainingMs <= 0) return widget;
  return {
    ...widget,
    isRunning: true,
    endAt: now + remainingMs,
    remainingMs: null,
  };
}

export function createCounterWidget(target, current = 0) {
  const validTarget = clampWidgetValue(target);
  if (validTarget === null) return null;
  return { type: 'counter', target: validTarget, current: Math.min(current, validTarget) };
}

export function createTimerWidget(targetMinutes) {
  const validMinutes = clampWidgetValue(targetMinutes, MAX_TIMER_MINUTES);
  if (validMinutes === null) return null;
  return {
    type: 'timer',
    targetMinutes: validMinutes,
    endAt: null,
    remainingMs: null,
    isRunning: false,
  };
}

export function canUseWidgetControls(task) {
  return task?.status === 'en cours';
}

export function syncTaskWidget(task, now = Date.now(), { previousStatus } = {}) {
  if (!task.widget) return task;

  let widget = { ...task.widget };
  let completed = false;

  if (widget.type === 'timer') {
    if (!canUseWidgetControls(task) && widget.isRunning) {
      widget = pauseTimerWidget(widget, now);
    } else if (
      canUseWidgetControls(task) &&
      previousStatus != null &&
      previousStatus !== 'en cours'
    ) {
      widget = startTimerWidget(widget, now);
    }
  }

  if (widget.type === 'counter') {
    completed = isCounterComplete(widget);
  } else if (widget.type === 'timer' && widget.isRunning && widget.endAt && widget.endAt <= now) {
    widget = {
      ...widget,
      isRunning: false,
      endAt: null,
      remainingMs: 0,
    };
    completed = true;
  }

  if (completed && task.status !== 'terminé') {
    return { ...task, widget, status: 'terminé' };
  }

  return { ...task, widget };
}

export function syncAllTasks(tasks, now = Date.now()) {
  return tasks.map(task => syncTaskWidget(task, now));
}

export function hasRunningTimer(tasks) {
  return tasks.some(task => task.widget?.type === 'timer' && task.widget?.isRunning);
}
