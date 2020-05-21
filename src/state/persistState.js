const stateKey = 'state';

export const persistState = (state, action) => {
  const actionDataKey = Object.keys(action).find((key) => key !== 'type');
  const actionData = action[actionDataKey];

  const newState = { ...state, [actionDataKey]: actionData };
  const stringifiedState = JSON.stringify(newState);
  localStorage.setItem(stateKey, stringifiedState);
};

export const getPersistedState = () => {
  const stateString = localStorage.getItem(stateKey);
  return JSON.parse(stateString);
};

export const clearPersistedState = () => localStorage.removeItem(stateKey);
