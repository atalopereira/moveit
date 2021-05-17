import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie, { set } from 'js-cookie';

interface UserInfoContextData {
  name: string;
  login: string;
  storeInfoUser: (name: string, login: string) => void;
}

interface UserInfoProviderProps {
  children: ReactNode
}

export const UserInfoContext = createContext({} as UserInfoContextData);

export function UserInfoProvider({ children } : UserInfoProviderProps) {
  const [name, setName] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const nameCookie = Cookie.get('moveit-name');
    const loginCookie = Cookie.get('moveit-login');
    
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
  }, []);


  function storeInfoUser(name: string, login: string) {
    Cookie.set('moveit-name', name);
    Cookie.set('moveit-login', login);
    setName(name);
    setLogin(login);
  };

  return (
    <UserInfoContext.Provider
      value={{
        name,
        login,
        storeInfoUser,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
