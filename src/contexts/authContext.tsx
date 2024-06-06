import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { API } from "../configs/api";

export type SignInTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  name: string;
  email: string;
  password: string;
};

type AuthContextTypes = {
  signIn: (params: SignInTypes) => Promise<boolean | void>;
  signUp: (params: SignUpTypes) => Promise<boolean | void>;
  isLoading: boolean;
  signOut: () => void;
  authUserID: string;
};

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [authUserID, setAuthUserID] = useState("");

  async function signIn({ email, password }: SignInTypes) {
    if (!email || !password) throw alert("Por favor informar email e senha!");

    setIsLoading(true);

    return API.post("/login", { email, password })
      .then((res) => {
        const userID = res.data.id;

        localStorage.setItem("@task_manager:userID", JSON.stringify(userID));

        return true;
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Um erro inesperado no login!");
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function signUp({ name, email, password }: SignUpTypes) {
    if (!name || !email || !password)
      throw alert("Por favor informar nome, email e senha!");

    setIsLoading(true);

    return API.post("/user", { name, email, password })
      .then((res) => {
        alert(res?.data.message);
        return true;
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Um erro inesperado no usuário!");
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() {
    localStorage.removeItem("@task_manager:userID");
    setAuthUserID("");
    // remove cokie
  }

  useEffect(() => {
    const userID = localStorage.getItem("@task_manager:userID");

    if (userID) {
      setAuthUserID(userID);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, isLoading, signUp, signOut, authUserID }}
    >
      {children}
    </AuthContext.Provider>
  );
}
