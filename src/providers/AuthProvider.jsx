import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.init';


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Login user func
  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Registration func
  const registration = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
  }

  // update User information
  const handleUpdate = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData)
  }

  // logout a user
   const logOut = () => {
    setLoading(true)
    return signOut(auth)
   }

   // login with google
   const handleGoogleLogin = (provider) => {
    return signInWithPopup(auth,provider)
   }

  // set observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    registration,
    handleUpdate,
    logOut,
    handleGoogleLogin
    
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
