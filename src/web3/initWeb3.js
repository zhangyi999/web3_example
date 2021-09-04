import Web3 from 'web3'

import {
    DEFAULT_PRC,
    DEFAULT_CHAIN_ID,
    PROXY_ZERO_ADDRESS
} from './config'

let defaultProvider = {}

// 初始化 web3
// 设计逻辑的原则是步骤清晰
/**
 * 1. 在钱包里，有自己的 provider
 * 2. 没有钱包，构建自己的 provider，设置默认 provider
 * 3. 使用 walletContent 需要重新配置 provider 
 */

 export function setDefaultProvider ({rpc = DEFAULT_PRC, selectedAddress = PROXY_ZERO_ADDRESS, chainId = DEFAULT_CHAIN_ID}) {
    defaultProvider = {rpc, selectedAddress, chainId} 
}

// 单链模式
let web3
export function initWeb3( ) {
    if ( web3 ) return web3
    let realProvider
    if (window.ethereum) {
        realProvider = window.ethereum
    } else if (window.web3) {
        realProvider = window.web3.currentProvider
    } else {
        realProvider = new Web3.providers.HttpProvider(
            defaultProvider.rpc,
            {
                ethereumNodeTimeout: 5000,
            }
        )
    }
    setProvider(realProvider)
    return web3
}

export function setProviderDefault() {
    setProvider(
        new Web3.providers.HttpProvider(
            defaultProvider.rpc,
            {
                ethereumNodeTimeout: 5000,
            }
        )
    )
}

export function setProvider(realProvider) {
    web3 = new Web3(realProvider);
    if (!web3.givenProvider) {
        web3.givenProvider = {
            selectedAddress: defaultProvider.selectedAddress,
            chainId: defaultProvider.chainId
        }
    }
}

let cache = {}
export function nweContract( address, abi ) {
    const web3 = initWeb3()
    const owner = web3.givenProvider.selectedAddress

    let contract = cache[address]
    if ( cache[address] ) {
        if (  contract.options.from !== owner ) {
        contract.options.from = owner
        }
        return contract
    }
    contract = new web3.eth.Contract(abi)
    contract.options.address = address
    if (owner) {
        contract.options.from = owner
    }
    cache[address] = contract
    return contract
}

let bn = null;
export const BN = num => {
    if ( bn === null ) {
        const web3 = initWeb3()
        bn = web3.utils.BN
    }
    return new bn(num)
} 