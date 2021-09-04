import {useMemo, useEffect, useState, createContext, useContext, useRef, useCallback } from 'react'

import WalletConnectProvider from "@walletconnect/web3-provider";

import {
    setDefaultProvider,
    setProviderDefault,
    setProvider,
    initWeb3,
    BN
} from './initWeb3'

import {
    PROXY_ZERO_ADDRESS,
    // DEFAULT_PRC,
    DEFAULT_CHAIN_ID
} from './config'

export * from './erc20'
export * from './multiCall'
export * from './sendTransaction'

export * from './config'
export {BN}

const CHANG_TYPE = {
    1: 'main',
    2: 'ropsten',
    3: 'rinkeby',
    100: 'xDai',
    56: 'bsc',
    66: 'okc',
    65: 'tOkc',
    256: 'tHeco',
    128: 'heco'
}

export const Context = createContext({})

function pollingBlock( ) {
    let start = false
    let newBlock = 0
    let callMap = new Map();
    let stopTime;
    async function poll(isUpdate) {
        const web3 = initWeb3()
        // 这里用 原生 subscribe 方法 和 getBlock 都是 7 个块通知一次
        // 要优化 就是 用 wss
        // console.log('poll')
        try {
            const {number:blockNumberChain} = await web3.eth.getBlock('latest')
            if ( newBlock < blockNumberChain || isUpdate) {
                newBlock = blockNumberChain
                for (let [key] of callMap) {
                    if ( key instanceof Function ) {
                        key(newBlock)
                    }
                }
            }
        } catch(error) {
            console.log(error.message)
            // 区块同步报错 通知客户端
        }
        if ( start ) {
            stopTime = setTimeout(poll, 3000)
        }
    }

    return {
        start(call) {
            if ( !call ) return 
            if ( start === false ) {
                // console.log(call)
                start = true
                poll(true)
            }
            if ( callMap.get(call) ) return
            callMap.set(call, true)
        },
        remove(call) {
            if ( !call ) return
            if ( callMap.get(call) ) {
                callMap.delete(call)
            }
            if ( callMap.size === 0 ) {
                start = false
                clearTimeout(stopTime)
            }
        }
    }
    
}

export const getBlock = pollingBlock()


const walletConnectRpc = {
    rpc: {
        1: "https://mainnet.mycustomnode.com",
        3: "https://ropsten.mycustomnode.com",
        100: "https://dai.poa.network",
        56: 'https://bsc-dataseed.binance.org',

        // ...
    },
}

function useWeb3Provider(defaultChian) {
    const [chainId, setId] = useState((defaultChian.chainId || DEFAULT_CHAIN_ID)*1)
    const [account, setAccount] = useState(defaultChian.selectedAddress || PROXY_ZERO_ADDRESS)
    // 没有安装钱包
    const [connected, setConnected] = useState( null )
    // 钱包已安装，但没有解锁
    const [unlock, setUnlock] = useState(false)

    // useWalletConnect
    // const walletProvider = useMemo(() => new WalletConnectProvider(walletConnectRpc),[])
    const setWalletName = useCallback(() => {
        const web3 = initWeb3()
        let walletName = null
        if ( web3.currentProvider.isTokenPocket ) {
            walletName = 'tp'
        }
        else if ( web3.currentProvider.isImToken ) {
            walletName = 'imToken'
        }
        else if ( web3.currentProvider.isMetaMask ) {
            walletName = 'metamask'
        }
        else if (  web3.currentProvider.bridge ) {
            walletName = 'WalletConnect'
        }
        setConnected(walletName)
        return walletName
    },[])
    useEffect(() => {
        // console.log({defaultChian})
        const {rpc, selectedAddress, chainId} = defaultChian
        setDefaultProvider({rpc, selectedAddress, chainId})
        const web3 = initWeb3()
        
        // 有些版本 loaded 前获取不到 chainId
        
        // if ( web3.givenProvider.selectedAddress ) {
        //     const account1 = web3.givenProvider.selectedAddress
        //     const chainId1 = web3.givenProvider.chainId
        //     setAccount(account1)
        //     setUnlock(!!account1)
        //     setWalletName()
        //     setId(chainId1*1)
        // } else {
            
        // }
        Promise.all([
            web3.eth.getChainId(),
            web3.eth.getAccounts()
        ]).then(([id, [account]])=> {
            // console.log(account, id)
            setId(id*1)
            setAccount(account)
            setWalletName()
            setUnlock(!!account)
        })
       
        try {
            web3.currentProvider.on("chainChanged", (chainId) => {
                setId(chainId * 1)
            });
            web3.currentProvider.on("accountsChanged", function (accounts) {
                setAccount(accounts[0])
                setUnlock(!!accounts[0])
            });
        } catch {}
       
    }, [defaultChian])

    const chainName = useMemo(() => {
        return CHANG_TYPE[chainId*1] || 'Net Error'
    },  [chainId])

    const connect = () => {
        const web3 = initWeb3()
        if ( web3.currentProvider.enable ) {
            web3.currentProvider.enable()
        } else {
            console.log('not install wallet')
        }
    }

    const connectWalletConnect = async () => {
        try {
            const provider = new WalletConnectProvider(walletConnectRpc)
            await provider.enable();
            const {
                accounts,
                chainId,
            } = provider

            setProvider(provider)

            setId(chainId*1)
            setAccount(accounts[0])
            setConnected()
            setUnlock(!!accounts[0])
            // Subscribe to session disconnection
            provider.on("disconnect", () => {
                setProviderDefault()
                const web3 = initWeb3()
                const owner = web3.givenProvider.selectedAddress
                const chainId = web3.givenProvider.chainId
                setId(chainId*1)
                setAccount(owner)
                // 查询当前钱包环境
                setWalletName()
                setUnlock(false)
            });
           
        } catch (error) {
            console.log(
                error
            )
        }
    }

    return {
        chainName,
        account,
        connect,
        connected,
        unlock,
        chainId,
        connectWalletConnect
    }
}

export function useWeb3() {
    const provider = useContext(Context)
    const [newBlock, setNewBlock] = useState(null)
    const callRef = useRef(null)
    useEffect(() => {
        callRef.current = (val) => {
            setNewBlock(val)
        }
        // getBlockNumber 第一次会 早于 useEffect 执行
        // 需要在 callRef 赋值后 再次激活 getBlockNumber
        setNewBlock(0)
        return () => {
            getBlock.remove(callRef.current)
        }
    }, [provider.chainId])

    // useCallback 并没有 缓存 函数，导致 getBlock 的栈不断增加

    function getBlockNumber() {
        getBlock.start(callRef.current)
        return newBlock
    }
    return {
        ...provider,
        getBlockNumber
    }
}

function Web3Provider({defaultChian = {} ,children }) {
    const {rpc, selectedAddress, chainId} = defaultChian
    const provider = useWeb3Provider({rpc, selectedAddress, chainId})
    return(
        <Context.Provider
            value={provider}
        >
            {children}
        </Context.Provider>
    )
}

export default Web3Provider