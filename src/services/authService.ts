import { auth, googleProvider } from "../configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

export const signUpWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};

export const logOut = async () => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email, {
    url: `${window.location.origin}/signin`,
  });
};
