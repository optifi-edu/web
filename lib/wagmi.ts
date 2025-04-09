import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'viem';

export const educhainTestnet: Chain = {
  id: 656476,
  name: 'EDU Chain Testnet',
  nativeCurrency: {
    name: 'Edu',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.open-campus-codex.gelato.digital'],
    },
    public: {
      http: ['https://rpc.open-campus-codex.gelato.digital'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://edu-chain-testnet.blockscout.com',
    },
  },
  testnet: true,
};

export const config = getDefaultConfig({
    appName: 'OptiFi',
    projectId: '04251f8180896efb96c57a0984864657',
    chains: [
      educhainTestnet
    ],
});
