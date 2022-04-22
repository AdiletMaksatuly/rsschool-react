import React, { useReducer } from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import rootReducer, { RootContext, initialState } from './context';

function App() {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <RootContext.Provider value={[state, dispatch]}>
      <Navbar />
      <AppRouter />
    </RootContext.Provider>
  );
}

export default App;
