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
  clientId:"0b82230109766dbe6a86f49be9a89351",
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
    address:"0x273bedc1a6241f8E7D78833FeEB4047F469d2c25",
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