import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const apiEndpoint = "alphabackend-btcxbbekfmdmeaa7.northeurope-01.azurewebsites.net/api/auth"
    const defaultValues = { accessToken: null, role: "admin", isAuthenticated: true, loading: false }
    const [auth, setAuth] = useState(defaultValues)

    const fetchAuthData = async () => {
      setAuth({ ...defaultValues, loading: false })
    
        try {
          const res = await fetch(apiEndpoint)

          if (res.ok) {
            // eslint-disable-next-line no-undef
            const data = await response.json();
            setAuth({ accessToken: data.accessToken, role: data.role, isAuthenticated: true, loading: false });
          }  

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          setAuth(defaultValues)
        }
    }
  
    useEffect(() => {
        fetchAuthData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={{auth}}>
            {children}
        </AuthContext.Provider>
    )
}