import React, { useContext, createContext, ReactNode } from "react";
import {
  createThirdwebClient,
  getContract,
  defineChain,
  // useMetamask,
  ThirdwebClient,
} from "thirdweb";
import { createWallet } from "thirdweb/wallets";
const wallets = [createWallet("io.metamask")];
//import { ethers } from "ethers";

interface MarketplaceContextProps {
  //connect: () => void;
  contract: any;
  wallets: any;
  client: any;
}

const MarketplaceContext = createContext<MarketplaceContextProps | undefined>(undefined);

const client: ThirdwebClient = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID as string,
});

interface MarketplaceContextProviderProps {
  children: ReactNode;
}

export const MarketplaceContextProvider = ({
  children,
}: MarketplaceContextProviderProps) => {
  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: import.meta.env.VITE_CONTRACT_ADDRESS as string,
  });

  // const connect =;

  return (
    <MarketplaceContext.Provider
      value={{
        // connect,
        contract,
        wallets,
        client,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplaceContext = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a MarketplaceContextProvider",
    );
  }
  return context;
};