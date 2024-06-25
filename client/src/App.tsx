import { useState } from 'react';
import type { ReactNode } from 'react';
import { UserContext } from './context/UserContext'

const App = ({ children } : { children: ReactNode}) => {
  const [ userData, setUserData ] = useState({
    id: 0,
    name: "",
    email: "",
  });
  return (
    <UserContext.Provider value={[ userData, setUserData ]}>
      {children}
    </UserContext.Provider>
  );
}

export default App;