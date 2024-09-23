import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const initialValue = { email: "", _id: "", token: "" };

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authData, setAuth] = useState({
    ...initialValue,
    _id: localStorage.getItem("_id") || "",
    token: localStorage.getItem("token") || "",
  });

  const [user, setUser] = useState(null);

  const storeTokenInLS = (value, key = "token") => {
    setAuth((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authData.token) {
        console.error('Token is missing');
        return;
      }

      try {
        const endpoint = `http://localhost:8000/donor/profile`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          console.error("Response not OK:", response.statusText);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, [authData.token]);

  const LogoutUser = () => {
    setAuth(initialValue);
    setUser(null);
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
  };

  return (
    <AuthContext.Provider value={{ authData, storeTokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }

  return authContextValue;
};






// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const AuthContext = createContext();

// const initialValue = { email: "", _id: "", token: "", apiPath: "" };

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [authData, setAuth] = useState({
//     ...initialValue,
//     _id: localStorage.getItem("_id") || "",
//     token: localStorage.getItem("token") || "",
//     apiPath: localStorage.getItem("apiPath") || "",
//   });

//   const [user, setUser] = useState(null);

//   const storeTokenInLS = (value, key = "token") => {
//     setAuth((prev) => ({ ...prev, [key]: value }));
//     localStorage.setItem(key, value);
//   };

//   const storeApiPathInLS = (path) => {
//     setAuth((prev) => ({ ...prev, apiPath: path }));
//     localStorage.setItem("apiPath", path);
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!authData.token || !authData.apiPath) {
//         console.error('Token or apiPath is missing');
//         return;
//       }

//       try {
//         const endpoint = `http://localhost:8000/${authData.apiPath}/owner`;
//         const response = await fetch(endpoint, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${authData.token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUser(data.data);
//         } else {
//           console.error("Response not OK:", response.statusText);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setUser(null);
//       }
//     };

//     fetchUserData();
//   }, [authData.token, authData.apiPath]);

//   const LogoutUser = () => {
//     setAuth(initialValue);
//     setUser(null);
//     navigate("/");
//     localStorage.removeItem("token");
//     localStorage.removeItem("_id");
//     localStorage.removeItem("apiPath");
//   };

//   return (
//     <AuthContext.Provider value={{ authData, storeTokenInLS, storeApiPathInLS, LogoutUser, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);

//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the provider");
//   }

//   return authContextValue;
// };

















// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const initialValue = { email: "", _id: "", token: "", apiPath: "" };

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [authData, setAuth] = useState({
//     ...initialValue,

//     _id: localStorage.getItem("_id") || "",
//     token: localStorage.getItem("token") || "",
//     apiPath: localStorage.getItem("apiPath") || "",
//   });

//   const [user, setUser] = useState(null);

//   const storeTokenInLS = (value, key = "token") => {
//     setAuth((prev) => ({ ...prev, [key]: value }));
//     localStorage.setItem(key, value);
//   };

//   const storeApiPathInLS = (path) => {
//     setAuth((prev) => ({ ...prev, apiPath: path }));
//     localStorage.setItem("apiPath", path);
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!authData.token || !authData.apiPath) {
//         console.error('Token or apiPath is missing');
//         return;
//       }

//       try {
//         const endpoint = `http://localhost:8000/${authData.apiPath}/owner`;
//         const response = await fetch(endpoint, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${authData.token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUser(data.data);
//         } else {
//           console.error("Response not OK:", response.statusText);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setUser(null);
//       }
//     };

//     fetchUserData();
//   }, [authData.token, authData.apiPath]);

//   const LogoutUser = () => {
//     setAuth(initialValue);
//     setUser(null);
//     navigate("/");
//     localStorage.removeItem("token");
//     localStorage.removeItem("_id");
//     localStorage.removeItem("apiPath");
//   };

//   return (
//     <AuthContext.Provider value={{ authData, storeTokenInLS, storeApiPathInLS, LogoutUser, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);

//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the provider");
//   }

//   return authContextValue;
// };
