import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';

export const ErrorContext = createContext({
  errorMsg: '',
  setError: () => null,
});

const ErrorProvider = ({ children }) => {
  const history = useHistory();

  const [errorMsg, setErrorMsg] = useState();
  const setError = useCallback((msg) => setErrorMsg(msg || 'Request failed.'), [
    setErrorMsg,
  ]);

  const prevUrl = useRef(history.location.pathname);
  useEffect(() => {
    if (prevUrl !== history.location.pathname) {
      setErrorMsg();
    }
  }, [history.location.pathname, setError, prevUrl]);
  return (
    <ErrorContext.Provider value={{ errorMsg, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
