// 代理黑洞，这个地址余额都为 0
export const PROXY_ZERO_ADDRESS = '0xA4BE0c823E1026AF948F9E278377381158e54Dc9'
export const ZERO_ADDRESS = '0x'+'0'.repeat(40)

export const DEFAULT_PRC = 'https://bsc-dataseed3.defibit.io'
export const DEFAULT_CHAIN_ID = '0X38'

export const multiCallAddress = {
    1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    56: '0x6E25E2E9d89d1Ba697B912599490268Ec0ec0724',
    97: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
    128: '0xc9a9F768ebD123A00B52e7A0E590df2e9E998707',
    256: '0x01A4bFec8Cfd2580640fc6Bd0CB11461a6C804f1'
}

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
