const TIMER_PATTERN = /(\d+)\s*min(?:ute?s?)?/i;
const COUNTER_CONTEXT_PATTERN = /(\d+)\s*(verres?|pages?|fois|pompes?|abdos?|séries?|reps?|répétitions?)/i;
const GENERIC_NUMBER_PATTERN = /\d+/g;

function searchInTexts(pattern, ...texts) {
  for (const text of texts) {
    if (!text) continue;
    const match = text.match(pattern);
    if (match) return parseInt(match[1], 10);
  }
  return null;
}

function stripTimerPatterns(text) {
  return text.replace(/\d+\s*min(?:ute?s?)?/gi, ' ');
}

function deduceFromGenericNumber(...texts) {
  for (const text of texts) {
    if (!text) continue;
    const cleaned = stripTimerPatterns(text);
    const match = cleaned.match(GENERIC_NUMBER_PATTERN);
    if (match) return parseInt(match[0], 10);
  }
  return null;
}

export function deduceTimerMinutes(title, description) {
  return searchInTexts(TIMER_PATTERN, title, description);
}

export function deduceCounterTarget(title, description) {
  const contextual = searchInTexts(COUNTER_CONTEXT_PATTERN, title, description);
  if (contextual !== null) return contextual;
  return deduceFromGenericNumber(title, description);
}
