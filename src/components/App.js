import { authService } from '../fbase';
import AppRouter from './Router';
import React, { useState, useEffect } from 'react';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setUserObj(user); // too big
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    // setUserObj(Object.assign({}, user));
  }

  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
          isLoggedIn={Boolean(userObj)}
          refreshUser={refreshUser}
        />
      ) : (
          "Initializing..."
        )
      }
      {/* <footer>&copy; {new Date().getFullYear()} nomad-tweeter-clone</footer> */}
    </>
  );
}

export default App;
