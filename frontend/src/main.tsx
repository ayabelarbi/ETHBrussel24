import React, { useState, createContext, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';

// WAGMI setup
import { WagmiProvider } from 'wagmi';
import { config } from './lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { PrivyProvider } from '@privy-io/react-auth';

import { privateKeyProvider } from "./utils/privateKeyProviders";

// import { ADAPTER_EVENTS, IProvider } from "@web3auth/base";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";


// const clientId = "BAoB4eLxa6edFP3ti85pbvLiSpSmuB8N_IdLlSA7YUNk1jEs7DKv928JRIleLBHh0pC08qkIaRp2Bj8SEgAnvcA";
// const verifier = "w3a-firebase-demo";

export const AuthContext = createContext<any>(null);
const queryClient = new QueryClient();


import Fonts from "./utils/fonts.tsx";
import theme from "./utils/theme.tsx";


const NavigateToDashboard = ({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  }, [setIsLoggedIn, navigate]);
  return null;
};


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <PrivyProvider
          appId='clyk29n9100fx13sboti8ylpg'
          config={{
            loginMethods: ['email', 'wallet', 'discord', 'google', 'sms', 'github', 'linkedin', 'spotify', 'farcaster'],
            appearance: {
              theme: 'light',
              accentColor: '#676FFF',
              logo: '',
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
          }}

        >
          <ChakraProvider theme={theme}>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                  <Fonts />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {isLoggedIn && <Route path="*" element={<NavigateToDashboard setIsLoggedIn={setIsLoggedIn} />} />}
                  

                  </Routes>
                </AuthContext.Provider>
              </QueryClientProvider>
            </WagmiProvider>
          </ChakraProvider>
        </PrivyProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);