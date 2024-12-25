import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.init';
import axios from 'axios';

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Login user func
  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Registration func
  const registration = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update User information
  const handleUpdate = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // logout a user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // login with google
  const handleGoogleLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // set observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          {
            withCredentials: true,
          }
        );
        console.log(data);
      } else {
        setUser(currentUser);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/logout`,

          {
            withCredentials: true,
          }
        );
      }
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
    handleGoogleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
