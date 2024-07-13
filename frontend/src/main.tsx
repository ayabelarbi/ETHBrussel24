import React, {useState, createContext} from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'


import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";


export const AuthContext = createContext<any>(null);

import Fonts from "./utils/fonts.tsx";
import theme from "./utils/theme.tsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Fonts />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
       
            
          </Routes>
          </AuthContext.Provider>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);