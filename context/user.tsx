import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

// Define the User interface matching the data from login response
interface User {
  username?: string;
  email?: string;
}

interface AuthContextProps {
  isLogin: boolean;
  user: User;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User>>;
}

// Create context with a more specific initial state
const initialState: AuthContextProps = {
  isLogin: false,
  user: { username: "", email: "" },
  setIsLogin: () => {},
  setUser: () => {},
};

// Create the context with initial state
export const AuthContext = createContext<AuthContextProps>(initialState);

// Custom hook for using auth context with type safety
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ username: "", email: "" });

  const value: AuthContextProps = {
    isLogin,
    user,
    setIsLogin,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
