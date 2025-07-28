import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../configs/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logOut,
  resetPassword,
} from "../services/authService";

type UserType = User | null;

type AuthContextType = {
  user: UserType;
  loading: boolean;
  signUpWithEmail: (email: string, password: string) => void;
  signInWithEmail: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  logOut: () => void;
  resetPassword: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // clean up function to unsub from onAuthStateChanged listener on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        logOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}
