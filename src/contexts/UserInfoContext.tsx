import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from 'js-cookie';

interface UserInfoContextData {
  id: number
  name: string;
  login: string;
  isLoadingLogin: boolean;
  isLoadingPage: boolean;
  storeInfoUser: (id: number, name: string, login: string) => void;
  changeLoandingLogin: () => void;
  changeLoadingPage: () => void;
}

interface UserInfoProviderProps {
  children: ReactNode
}

export const UserInfoContext = createContext({} as UserInfoContextData);

export function UserInfoProvider({ children } : UserInfoProviderProps) {
  // User
  const [name, setName] = useState(null);
  const [login, setLogin] = useState(null);
  const [id, setId] = useState(0);
  
  // Loading
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    const nameCookie = Cookie.get('moveitName');
    const loginCookie = Cookie.get('moveitLogin');
    const idCookie = Number(Cookie.get('moveitId'));
    
    if (name != nameCookie) {
      if (nameCookie === "null") {
        setName(JSON.parse(nameCookie));
      } else {
        setName(nameCookie);
      }
    }

    if (login != loginCookie) {
      setLogin(loginCookie);
    }

    if (id != idCookie) {
      setId(idCookie);
    }
  }, []);


  function storeInfoUser(id: number, name: string, login: string) {
    Cookie.set('moveitName', name);
    Cookie.set('moveitLogin', login);
    Cookie.set('moveitId', String(id));
    setName(name);
    setLogin(login);
    setId(id);
  };

  function changeLoandingLogin() {
    setIsLoadingLogin(!isLoadingLogin);
  }

  function changeLoadingPage() {
    setIsLoadingPage(!isLoadingPage);
  }

  return (
    <UserInfoContext.Provider
      value={{
        id,
        name,
        login,
        isLoadingLogin,
        isLoadingPage,
        storeInfoUser,
        changeLoandingLogin,
        changeLoadingPage
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
