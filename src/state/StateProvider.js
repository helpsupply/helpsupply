import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { reducer, initialState } from './reducer';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';

export const actions = {
  ADD_PENDING_FACILITY: 'ADD_PENDING_FACILITY',
  EDIT_SERVICE_REDIRECT: 'EDIT_SERVICE_REDIRECT', // return user to review page if editing service
};

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useReducer(reducer, initialState);

  // reset intended route (review if editing) after user saved edits
  const prevUrl = useRef(history.location.pathname);
  const prevShouldRedirect = useRef(state.editServiceUrl);
  useEffect(() => {
    if (history.location.pathname !== prevUrl && prevShouldRedirect.current) {
      setState({ type: actions.EDIT_SERVICE_REDIRECT, editServiceUrl: '' });
      return;
    }
    prevUrl.current = history.location.pathname;
    prevShouldRedirect.current = state.editServiceUrl;
  }, [
    prevShouldRedirect,
    prevUrl,
    history.location.pathname,
    state.editServiceUrl,
  ]);
  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
