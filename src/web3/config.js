// 代理黑洞，这个地址余额都为 0
export const PROXY_ZERO_ADDRESS = '0xA4BE0c823E1026AF948F9E278377381158e54Dc9'
export const ZERO_ADDRESS = '0x'+'0'.repeat(40)

export const DEFAULT_PRC = 'https://bsc-dataseed3.defibit.io'
export const DEFAULT_CHAIN_ID = '0X38'

export const N_TYPE = {
  heco: {
    name: 'ht',
    symbol: 'HT',
    decimals: 18,
    chainId: 128,
    chain: '0x80',
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorerUrls: ['https://hecoinfo.com'],
  },
  bsc: {
    name: 'bnb',
    symbol: 'BNB',
    decimals: 18,
    chainId: 56,
    chain: '0x38',
    rpcUrls: ['https://bsc-dataseed3.defibit.io'],
    blockExplorerUrls: ['https://bscscan.com'],
  }
} 
