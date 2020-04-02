import { getPersistedState, persistState } from './persistState';
import { actions } from './StateProvider';

const persistedState = getPersistedState();

export const initialState = persistedState || {
  pendingFacility: {},
};

export const reducer = (state, action) => {
  persistState(state, action);

  switch (action.type) {
    case actions.ADD_PENDING_FACILITY:
      return {
        ...state,
        pendingFacility: action.pendingFacility,
      };

    default:
      return state;
  }
};
