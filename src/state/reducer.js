import { actions } from './StateProvider';

export const initialState = {
  pendingFacility: {},
};

export const reducer = (state, action) => {
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
