import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext([]);
const AddUserContext = createContext();
const LoggedUserContext = createContext();
const LoginUserContext = createContext();
const LogOutUserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

export const useAddUsers = () => {
  return useContext(AddUserContext);
};

export const useLoggedUser = () => {
  return useContext(LoggedUserContext);
};

export const useLogin = () => {
  return useContext(LoginUserContext);
};

export const useLogout = () => {
  return useContext(LogOutUserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState([]);

  useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem("users"));
      if (users) {
        setUsers(users);
      }
    } catch (error) {}
  }, []);

  const addUser = (user) => {
    setUsers((prev) => {
      localStorage.setItem("users", JSON.stringify([...prev, user]));
      return [...prev, user];
    });
  };

  const login = (user) => {
    setLoggedInUser(user);
  };

  const logout = () => {
    setLoggedInUser([]);
  };

  return (
    <UserContext.Provider value={users}>
      <AddUserContext.Provider value={addUser}>
        <LoggedUserContext.Provider value={loggedInUser}>
          <LoginUserContext.Provider value={login}>
            <LogOutUserContext.Provider value={logout}>
              {children}
            </LogOutUserContext.Provider>
          </LoginUserContext.Provider>
        </LoggedUserContext.Provider>
      </AddUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
