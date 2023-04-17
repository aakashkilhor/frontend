import { useState } from 'react';
import AuthContext from './AuthContext';

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, setUserId, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;