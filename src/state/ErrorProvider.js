import React, { createContext, useState } from 'react';

export const ErrorContext = createContext({
  errorMsg: '',
  setError: () => null,
});

const ErrorProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState();
  const setError = (msg) => setErrorMsg(msg || 'Request failed.');

  return (
    <ErrorContext.Provider value={{ errorMsg, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
