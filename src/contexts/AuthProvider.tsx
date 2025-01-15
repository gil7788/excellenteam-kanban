import { createContext, useState, useContext, PropsWithChildren } from "react";
import { User } from "../types/types";

type AuthContextProps = {
  isAuthorized: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);
//const AuthContext = createContext(null);

type AuthProviderProps = PropsWithChildren;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const mockUser: User = {
      username: "username",
      email: "user@gmail.com",
      password: "1234",
    };

    if (email === mockUser.email && password === mockUser.password) {
      setIsAuthorized(true);
      setUser(mockUser);
    } else {
      alert("Wrong email or password");
    }
  };

  const logout = () => {
    setIsAuthorized(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
