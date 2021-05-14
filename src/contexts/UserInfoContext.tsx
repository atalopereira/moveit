import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie, { set } from 'js-cookie';

interface UserInfoContextData {
  name: string;
  login: string
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

    if (name !== nameCookie) {
      setName(nameCookie);
    }

    if (login !== loginCookie) {
      setLogin(loginCookie);
    }
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        name,
        login
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
