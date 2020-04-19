import { getPersistedState, persistState } from './persistState';
import { actions } from './StateProvider';

const persistedState = getPersistedState();

export const initialState = persistedState || {
  pendingFacility: {},
  editServiceUrl: '',
};

export const reducer = (state, action) => {
  persistState(state, action);
  switch (action.type) {
    case actions.ADD_PENDING_FACILITY:
      return {
        ...state,
        pendingFacility: action.pendingFacility,
      };
    case actions.EDIT_SERVICE_REDIRECT:
      return {
        ...state,
        editServiceUrl: action.editServiceUrl,
      };

    default:
      return state;
  }
};
